import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PgService } from "~/database/pg.service";

// ─── Response shape returned to the controller ───────────────────────────────
export interface AiChatResponse {
  response: string;
  suggestedTasks: SuggestedTask[];
  suggestedSections: SuggestedSection[];
  prioritizedTaskIds: string[];
  suggestedActions: SuggestedAction[];
  assignmentSuggestions: AssignmentSuggestion[];
  unassignedTaskIds: string[];
}

export interface SuggestedTask {
  title: string;
  description?: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  /** tempSectionKey links this task to a SuggestedSection.tempKey (new section)
   *  OR sectionId links it to an existing section */
  tempSectionKey?: string;
  sectionId?: string;
  deadline?: string; // ISO-8601
  estimate?: number; // minutes
  subtasks?: { title: string; estimate?: number }[];
  /** userId of the recommended assignee (from members context) */
  suggestedAssigneeId?: string;
}

export interface SuggestedSection {
  /** Temporary key used to cross-reference tasks in the same response (e.g. "section-todo") */
  tempKey: string;
  name: string;
  description?: string;
  color?: string; // hex
  icon?: string;
  position?: number;
}

export interface SuggestedAction {
  type: "UPDATE_STATUS" | "UPDATE_PRIORITY" | "DELETE";
  taskId: string;
  taskTitle: string;
  value: string;
}

export interface AssignmentSuggestion {
  taskId: string;
  taskTitle: string;
  suggestedUserId: string;
  suggestedUserName: string;
  reason: string;
}

@Injectable()
export class AiService {
  constructor(
    private readonly pg: PgService,
    private readonly configService: ConfigService,
  ) {}

  async chat(userId: string, projectId: string, message: string): Promise<AiChatResponse> {
    const apiKey =
      this.configService.get<string>("GEMINI_API_KEY") || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new BadRequestException("GEMINI_API_KEY is not configured on the server");
    }

    // ─── 1. Verify membership & load project ─────────────────────────────────
    const project = await this.pg.project.findFirst({
      where: {
        id: projectId,
        members: { some: { userId } },
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, fullname: true, email: true },
            },
            role: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!project) {
      throw new ForbiddenException("Project not found or you do not have access to it.");
    }

    // ─── 2. Load sections for this project ───────────────────────────────────
    const sections = await this.pg.section.findMany({
      where: { projectId },
      orderBy: { position: "asc" },
      select: {
        id: true,
        name: true,
        position: true,
      },
    });

    // ─── 3. Load tasks ────────────────────────────────────────────────────────
    const tasks = await this.pg.task.findMany({
      where: { projects: { some: { projectId } } },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        deadline: true,
        estimate: true,
        spent: true,
        createdAt: true,
        updatedAt: true,
        sections: {
          select: {
            sectionId: true,
            section: { select: { name: true } },
          },
        },
        subtasks: {
          select: { id: true, title: true, status: true },
        },
        assignees: {
          select: {
            userId: true,
            user: { select: { fullname: true } },
          },
        },
      },
    });

    // ─── 4. Format context strings ────────────────────────────────────────────
    const formattedMembers =
      project.members.length === 0
        ? "No members yet."
        : project.members
            .map(
              (m) =>
                `- UserID: ${m.userId} | Name: ${m.user?.fullname || "Unknown"} | Role: ${m.role?.name || "Member"}`,
            )
            .join("\n");

    const formattedSections =
      sections.length === 0
        ? "No sections yet."
        : sections
            .map(
              (s, i) =>
                `[${i + 1}] ID: ${s.id} | Name: ${s.name} | Position: ${s.position ?? i}`,
            )
            .join("\n");

    const formattedTasks =
      tasks.length === 0
        ? "No tasks yet."
        : tasks
            .map(
              (t, i) =>
                `[${i + 1}] ID: ${t.id}
   Title: ${t.title}
   Status: ${t.status} | Priority: ${t.priority}
   Section: ${t.sections[0]?.section?.name || "Unassigned"} (sectionId: ${t.sections[0]?.sectionId || ""})
   Deadline: ${t.deadline ? t.deadline.toISOString() : "None"}
   Estimate: ${t.estimate ? `${t.estimate} min` : "None"}
   Description: ${t.description || "None"}
   Assignees: ${t.assignees?.length ? t.assignees.map((a) => `${a.user?.fullname}(${a.userId})`).join(", ") : "Unassigned"}
   Subtasks: ${t.subtasks.length > 0 ? t.subtasks.map((s) => `${s.title}(${s.status})`).join(", ") : "None"}`,
            )
            .join("\n\n");

    // ─── 5. System prompt ─────────────────────────────────────────────────────
    const systemInstruction = `
You are PlanWise AI — a sharp, senior project management assistant embedded in a task management tool.
Your goal is to help teams set up, organize, and execute projects effectively.

## LANGUAGE RULE
Always respond in the SAME language the user writes in.
Vietnamese in → Vietnamese out. English in → English out.

## CORE BEHAVIOR
Before acting, silently classify the user's intent into ONE OR MORE of:

  A) SETUP_PROJECT    — New/empty project: suggest sections + tasks that fit the project type
  B) CREATE_SECTIONS  — User explicitly wants new sections/columns created
  C) CREATE_TASKS     — User describes work to break down into tasks
  D) PRIORITIZE       — User wants tasks reordered by urgency
  E) TASK_ACTION      — User wants to update/delete a specific task
  F) ASSIGN           — User wants to assign tasks to members based on skills/role
  G) STATS_UNASSIGNED — User wants to know which tasks have no assignee
  H) QUESTION         — General question about the project or how to use PlanWise

For MIXED intent, handle each in order and populate all relevant fields.

---

## INTENT A — SETUP_PROJECT
Triggered when: the project has no sections AND no tasks, OR the user says "set up my project",
"help me start", "tạo project cho tôi", "setup dự án", etc.

Populate: suggestedSections + suggestedTasks
Rules:
- Infer the project type from project name/description (software, marketing, research, event, etc.)
- Suggest 3–5 sections appropriate for that project type.
  * Software projects → "Backlog", "To Do", "In Progress", "Review", "Done"
  * Marketing campaigns → "Ideas", "Planning", "In Progress", "Review", "Published"
  * Research projects → "Literature Review", "Experiments", "Analysis", "Writing", "Done"
  * If type is unclear, use a universal kanban: "Backlog", "To Do", "In Progress", "Done"
- Give each section a tempKey (e.g. "section-backlog"), a color (hex), and a sensible position.
- Suggest 5–10 starter tasks spread across the sections using tempSectionKey to link them.
- Assign suggestedAssigneeId to tasks when a member's skills clearly match the task.
- Leave prioritizedTaskIds, suggestedActions, assignmentSuggestions, unassignedTaskIds as [].

## INTENT B — CREATE_SECTIONS
Triggered when: user explicitly asks to add/create sections.

Populate: suggestedSections
Rules:
- Create only the sections requested; do NOT create tasks unless also requested.
- Assign position starting after the last existing section position.
- Leave all other action arrays as [].

## INTENT C — CREATE_TASKS
Triggered when: user describes a feature, goal, or piece of work to be broken down.

Populate: suggestedTasks
Rules:
- Break the goal into 3–7 concrete, actionable tasks.
- Each task MUST have either sectionId (existing) or tempSectionKey (new section in same response).
  If no section context is given, use the most appropriate existing section by name,
  or if none exist, leave sectionId empty and note it in the response.
- Assign suggestedAssigneeId when a member's skills match the task.
- Assign priority: URGENT > HIGH > NORMAL > LOW based on impact/dependency.
- Add subtasks only when meaningful (avoid trivial steps). Each subtask MUST have a precise, realistic estimate in minutes.
- The parent task's total estimate MUST be exactly equal to the sum of all its subtasks' estimates.
- Leave all other action arrays as [].

## INTENT D — PRIORITIZE
Populate: prioritizedTaskIds
Rules:
- If a section name is mentioned, include ONLY tasks from that section.
- If no section mentioned, prioritize ALL tasks.
- Sort: URGENT → deadline asc (None last) → HIGH → NORMAL → LOW.
- Leave all other action arrays as [].

## INTENT E — TASK_ACTION
Populate: suggestedActions
Rules:
- Fuzzy-match task by title from the task list.
- UPDATE_STATUS values: "TODO" | "RUNNING" | "DONE" | "ARCHIVED"
- UPDATE_PRIORITY values: "LOW" | "NORMAL" | "HIGH" | "URGENT"
- DELETE: value = ""
- NEVER invent a taskId.
- Leave all other action arrays as [].

## INTENT F — ASSIGN
Triggered when: user asks "ai nên làm task này?", "assign tasks", "phân công việc",
"gán task cho thành viên phù hợp", or pastes member skill descriptions.

Populate: assignmentSuggestions
Rules:
- Read each member's skills and role from the context.
- Match unassigned tasks to the most suitable member based on skill overlap.
- For each suggestion, include a short reason (1 sentence) explaining the match.
- Only suggest assignments for tasks that currently have NO assignees.
- Leave all other action arrays as [].

## INTENT G — STATS_UNASSIGNED
Triggered when: "task nào chưa có người làm?", "unassigned tasks", "thống kê task chưa assign"

Populate: unassignedTaskIds
Rules:
- Return IDs of all tasks where assignees list is empty.
- In the response field, summarize: total count, list them with [Title](id) links.
- Leave all other action arrays as [].

## INTENT H — QUESTION
Populate: response field only.
Answer directly using project context. Reference tasks as [Title](task-id).
Leave all action arrays as [].

---

## RESPONSE FIELD FORMATTING
- Clean Markdown: **bold**, bullet lists, inline code.
- Task links: [Task Title](task-id) — exact IDs only.
- Section references: **Section Name** in bold.
- 1–2 sentence preamble confirming the action, then let structured data speak.
- Never use filler phrases ("Sure!", "Of course!", "Great question!").

## STRICT OUTPUT RULES
- Return ONLY valid JSON matching the provided schema.
- Populate ONLY fields relevant to detected intents — all others = [].
- NEVER invent IDs (task or section). Use only IDs from the provided context.
- If request is ambiguous, ask ONE clarifying question and return empty arrays.
- tempKey in suggestedSections must be unique strings within the response (e.g. "section-todo", "section-backlog").
- A suggestedTask referencing a tempSectionKey must match a tempKey in suggestedSections of the SAME response EXACTLY.
  For example, if you suggest a section with tempKey = "section-backlog", any task intended for that section MUST have tempSectionKey = "section-backlog". Do NOT use "backlog" or any other variation.
`;

    // ─── 6. Request body with full schema ────────────────────────────────────
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `## PROJECT CONTEXT
Name: ${project.name}
Description: ${project.description || "No description provided"}

## MEMBERS (${project.members.length})
${formattedMembers}

## EXISTING SECTIONS (${sections.length})
${formattedSections}

## EXISTING TASKS (${tasks.length})
${formattedTasks}

---
## USER REQUEST
"${message}"

Instructions: Classify intent(s), then respond per system prompt rules. Return valid JSON only.`,
            },
          ],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            // ── Natural language reply ──────────────────────────────────────
            response: {
              type: "STRING",
              description:
                "Markdown reply to the user. Mirror their language. Reference tasks as [Title](id).",
            },

            // ── Intent A / B: new sections to create ───────────────────────
            suggestedSections: {
              type: "ARRAY",
              description: "New sections to create (intents A, B). Leave [] otherwise.",
              items: {
                type: "OBJECT",
                properties: {
                  tempKey: {
                    type: "STRING",
                    description:
                      "Unique key within this response used to link tasks. E.g. 'section-todo'.",
                  },
                  name: { type: "STRING" },
                  description: { type: "STRING" },
                  color: { type: "STRING", description: "Hex color, e.g. #3B82F6" },
                  icon: { type: "STRING", description: "Icon name or emoji." },
                  position: { type: "INTEGER", description: "Display order (0-based)." },
                },
                required: ["tempKey", "name"],
              },
            },

            // ── Intent A / C: new tasks to create ──────────────────────────
            suggestedTasks: {
              type: "ARRAY",
              description: "New tasks to create (intents A, C). Leave [] otherwise.",
              items: {
                type: "OBJECT",
                properties: {
                  title: { type: "STRING" },
                  description: { type: "STRING" },
                  priority: {
                    type: "STRING",
                    enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
                  },
                  tempSectionKey: {
                    type: "STRING",
                    description:
                      "References a suggestedSection.tempKey in this response (new section).",
                  },
                  sectionId: {
                    type: "STRING",
                    description: "Existing section ID. Use this OR tempSectionKey, not both.",
                  },
                  deadline: {
                    type: "STRING",
                    description: "ISO-8601 deadline if inferrable, else omit.",
                  },
                  estimate: {
                    type: "INTEGER",
                    description: "Total estimate in minutes. Must be equal to the sum of all subtasks' estimates if subtasks exist.",
                  },
                  suggestedAssigneeId: {
                    type: "STRING",
                    description: "userId of the best-matched member, if determinable.",
                  },
                  subtasks: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        title: { type: "STRING" },
                        estimate: { type: "INTEGER", description: "Estimate in minutes. Mandatory." },
                      },
                      required: ["title", "estimate"],
                    },
                  },
                },
                required: ["title", "priority", "estimate"],
              },
            },

            // ── Intent D: re-ordered task IDs ──────────────────────────────
            prioritizedTaskIds: {
              type: "ARRAY",
              description: "Ordered task IDs by urgency (intent D). Leave [] otherwise.",
              items: { type: "STRING" },
            },

            // ── Intent E: mutations on existing tasks ──────────────────────
            suggestedActions: {
              type: "ARRAY",
              description: "Update/delete operations on existing tasks (intent E). Leave [] otherwise.",
              items: {
                type: "OBJECT",
                properties: {
                  type: {
                    type: "STRING",
                    enum: ["UPDATE_STATUS", "UPDATE_PRIORITY", "DELETE"],
                  },
                  taskId: {
                    type: "STRING",
                    description: "Exact ID from the task list — never invented.",
                  },
                  taskTitle: { type: "STRING" },
                  value: {
                    type: "STRING",
                    description: "New value, or empty string for DELETE.",
                  },
                },
                required: ["type", "taskId", "taskTitle", "value"],
              },
            },

            // ── Intent F: member ↔ task matching ──────────────────────────
            assignmentSuggestions: {
              type: "ARRAY",
              description:
                "Recommended assignees for unassigned tasks (intent F). Leave [] otherwise.",
              items: {
                type: "OBJECT",
                properties: {
                  taskId: { type: "STRING" },
                  taskTitle: { type: "STRING" },
                  suggestedUserId: { type: "STRING" },
                  suggestedUserName: { type: "STRING" },
                  reason: {
                    type: "STRING",
                    description: "One-sentence explanation of the skill match.",
                  },
                },
                required: [
                  "taskId",
                  "taskTitle",
                  "suggestedUserId",
                  "suggestedUserName",
                  "reason",
                ],
              },
            },

            // ── Intent G: unassigned task IDs ─────────────────────────────
            unassignedTaskIds: {
              type: "ARRAY",
              description: "IDs of tasks with no assignee (intent G). Leave [] otherwise.",
              items: { type: "STRING" },
            },
          },
          required: ["response"],
        },
      },
    };

    // ─── 7. Model fallback chain ──────────────────────────────────────────────
    const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
    let lastError: unknown = null;
    let responseData: unknown = null;

    for (const model of models) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          },
        );

        if (res.ok) {
          responseData = await res.json();
          break;
        } else {
          const errorText = await res.text();
          try {
            const parsedError = JSON.parse(errorText);
            if (res.status === 429 || parsedError?.error?.code === 429) {
              throw new BadRequestException(
                `Gemini API Quota Exceeded (429): ${parsedError?.error?.message || "Lượt gọi API đã đạt giới hạn miễn phí hàng ngày hoặc số lần yêu cầu mỗi phút. Vui lòng thử lại sau."}`,
              );
            }
          } catch (pe) {
            if (pe instanceof BadRequestException) throw pe;
          }
          lastError = new Error(`Gemini API Error (${model}): ${errorText}`);
        }
      } catch (err: unknown) {
        if (err instanceof BadRequestException) {
          throw err;
        }
        lastError = err;
      }
    }

    if (!responseData) {
      const msg =
        lastError instanceof Error
          ? lastError.message
          : "Failed to process AI chat request";
      throw new BadRequestException(msg);
    }

    // ─── 8. Parse & normalize response ───────────────────────────────────────
    try {
      const data = responseData as Record<string, unknown>;
      const candidates = data?.candidates as Array<Record<string, unknown>> | undefined;
      const content = candidates?.[0]?.content as Record<string, unknown> | undefined;
      const parts = content?.parts as Array<Record<string, unknown>> | undefined;
      const text = parts?.[0]?.text as string | undefined;

      if (!text) {
        throw new Error("Invalid response from Gemini API: no text content");
      }

      // Strip markdown fences if the model wraps output despite responseMimeType
      const clean = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      const parsed = JSON.parse(clean);

      // Normalize: ensure all array fields exist even if model omits them
      return {
        response: parsed.response ?? "",
        suggestedSections: parsed.suggestedSections ?? [],
        suggestedTasks: parsed.suggestedTasks ?? [],
        prioritizedTaskIds: parsed.prioritizedTaskIds ?? [],
        suggestedActions: parsed.suggestedActions ?? [],
        assignmentSuggestions: parsed.assignmentSuggestions ?? [],
        unassignedTaskIds: parsed.unassignedTaskIds ?? [],
      } satisfies AiChatResponse;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to parse AI response";
      throw new BadRequestException(msg);
    }
  }
}