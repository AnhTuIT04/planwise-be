/* eslint-disable no-console */
import { hash } from "bcrypt";

import { DefaultRole } from "@/common/enum/default-role.enum";
import { DEFAULT_ROLE_PERMISSIONS } from "@/common/enum/permission.enum";
import { midpoint } from "@/common/utils/positioning.utils";
import { PrismaClient, PriorityLevel, TaskStatus } from "prisma/client/pg";

const prisma = new PrismaClient();

const SEED_TAG = "[seed]";

const PROJECT_NAMES = ["Frontend Polishing", "API Migration"] as const;

const TASK_TITLES = [
  "Tighten loading states on Kanban",
  "Fix flaky drag-and-drop in Safari",
  "Refactor task modal store",
  "Audit color tokens for dark mode",
  "Wire up empty states for sections",
  "Add reduced-motion fallbacks",
  "Document API auth flow",
  "Migrate auth tokens to refresh rotation",
  "Sweep stale console.logs",
  "Backfill missing aria-labels",
  "Compress hero images on landing",
  "Resolve TS strict mode hits in services",
  "Plumb timezone into deadlines",
  "Triage flaky e2e specs",
  "Cut unused recharts subpaths",
  "Spike: virtualized task list",
  "Polish empty review state",
  "Sketch onboarding nudge for new users",
  "Wire up review export to CSV",
  "Reproduce member invite race condition",
  "Patch n+1 in section tasks query",
  "Document the position-string algorithm",
  "Move all dates to UTC at the boundary",
  "Add metrics for slow review queries",
  "Switch JWT to RS256",
  "Tidy permission handler base class",
  "Lint sweep for unused exports",
  "Pin Node version in CI",
  "Profile bundle size on the home route",
  "Move task duration formatter into utils",
];

interface SeededUser {
  id: string;
  email: string;
  workspaceId: string;
}

interface SeededProject {
  id: string;
  name: string;
  sectionId: string;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickWeighted<T>(weights: { value: T; weight: number }[]): T {
  const total = weights.reduce((s, w) => s + w.weight, 0);
  let roll = Math.random() * total;
  for (const w of weights) {
    if ((roll -= w.weight) <= 0) return w.value;
  }
  return weights[weights.length - 1].value;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function ensureUser(email: string, password: string): Promise<SeededUser> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`✓ Using existing user ${email}`);
    return { id: existing.id, email: existing.email, workspaceId: existing.workspaceId };
  }

  console.log(`+ Creating new user ${email}`);
  const hashed = await hash(password, 10);

  const created = await prisma.$transaction(
    async (tx) => {
      const project = await tx.project.create({
        data: {
          name: "My Workspace",
          isPersonal: true,
          owner: {
            create: {
              email,
              password: hashed,
              fullname: "Seed User",
              verified: true,
              workspaceId: "",
            },
          },
          sections: { create: [{ name: "Default", position: midpoint(null, null) }] },
          roles: {
            create: [
              {
                name: DefaultRole.OWNER,
                default: true,
                permissions: JSON.stringify(DEFAULT_ROLE_PERMISSIONS.OWNER),
              },
            ],
          },
        },
        include: { owner: true, roles: true },
      });

      const updated = await tx.user.update({
        where: { id: project.owner.id },
        data: {
          workspaceId: project.id,
          memberships: {
            create: {
              projectId: project.id,
              roleId: project.roles.find((r) => r.name === (DefaultRole.OWNER as string))!.id,
            },
          },
        },
      });

      return updated;
    },
    { maxWait: 5000, timeout: 20000 },
  );

  return { id: created.id, email: created.email, workspaceId: created.workspaceId };
}

async function ensureProjects(user: SeededUser): Promise<SeededProject[]> {
  const personal = await prisma.section.findFirst({
    where: { projectId: user.workspaceId },
    orderBy: { position: "asc" },
  });
  if (!personal) throw new Error("Personal workspace section missing — bad state");

  const projects: SeededProject[] = [{ id: user.workspaceId, name: "My Workspace", sectionId: personal.id }];

  for (const name of PROJECT_NAMES) {
    const existing = await prisma.project.findFirst({
      where: {
        name,
        isPersonal: false,
        members: { some: { userId: user.id } },
      },
      include: { sections: { orderBy: { position: "asc" }, take: 1 } },
    });

    if (existing && existing.sections.length > 0) {
      console.log(`✓ Using existing project "${name}"`);
      projects.push({ id: existing.id, name, sectionId: existing.sections[0].id });
      continue;
    }

    console.log(`+ Creating project "${name}"`);
    const created = await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name,
          isPersonal: false,
          ownerId: user.id,
          sections: { create: [{ name: "Tasks", position: midpoint(null, null) }] },
          roles: {
            create: [
              {
                name: DefaultRole.OWNER,
                default: true,
                permissions: JSON.stringify(DEFAULT_ROLE_PERMISSIONS.OWNER),
              },
              {
                name: DefaultRole.MEMBER,
                default: true,
                permissions: JSON.stringify(DEFAULT_ROLE_PERMISSIONS.MEMBER),
              },
            ],
          },
        },
        include: {
          sections: { orderBy: { position: "asc" }, take: 1 },
          roles: true,
        },
      });

      const ownerRole = project.roles.find((r) => r.name === (DefaultRole.OWNER as string))!;
      await tx.projectMember.create({
        data: { projectId: project.id, userId: user.id, roleId: ownerRole.id },
      });

      return project;
    });

    projects.push({ id: created.id, name, sectionId: created.sections[0].id });
  }

  return projects;
}

interface TaskBlueprint {
  status: TaskStatus;
  priority: PriorityLevel;
  estimateMs: number;
  spentMs: number;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date | null;
}

function blueprintFor(now: Date): TaskBlueprint {
  // Pick which window the task lives in
  const window = pickWeighted([
    { value: "thisWeek", weight: 4 }, // last 7 days
    { value: "thisMonth", weight: 6 }, // 7..30 days ago
    { value: "lastMonth", weight: 2 }, // 30..60 days ago
  ]);

  let updatedDaysAgo: number;
  if (window === "thisWeek") updatedDaysAgo = randInt(0, 6);
  else if (window === "thisMonth") updatedDaysAgo = randInt(7, 29);
  else updatedDaysAgo = randInt(30, 59);

  const updatedAt = new Date(now);
  updatedAt.setDate(updatedAt.getDate() - updatedDaysAgo);
  updatedAt.setHours(randInt(8, 18), randInt(0, 59), 0, 0);

  const createdAt = new Date(updatedAt);
  createdAt.setDate(createdAt.getDate() - randInt(1, 14));

  // Status mix
  const status = pickWeighted([
    { value: TaskStatus.DONE, weight: 6 },
    { value: TaskStatus.RUNNING, weight: 2 },
    { value: TaskStatus.TODO, weight: 2 },
  ]);

  const priority = pickWeighted([
    { value: PriorityLevel.LOW, weight: 1 },
    { value: PriorityLevel.NORMAL, weight: 5 },
    { value: PriorityLevel.HIGH, weight: 3 },
    { value: PriorityLevel.URGENT, weight: 1 },
  ]);

  // 30 min .. 4 hours, in ms
  const estimateMs = randInt(30, 240) * 60 * 1000;
  // spent: most around estimate, some way over
  const ratio = pickWeighted([
    { value: 0.6, weight: 2 },
    { value: 0.9, weight: 4 },
    { value: 1.1, weight: 3 },
    { value: 1.6, weight: 2 },
    { value: 2.4, weight: 1 },
  ]);
  const spentMs = Math.round(estimateMs * ratio);

  // Deadline: 60% have one. For DONE, mix on-time vs late.
  let deadline: Date | null = null;
  if (Math.random() < 0.6) {
    if (status === TaskStatus.DONE) {
      // 70% on-time (deadline >= updatedAt), 30% late (deadline < updatedAt)
      const isOnTime = Math.random() < 0.7;
      const offset = randInt(1, 5);
      deadline = new Date(updatedAt);
      deadline.setDate(deadline.getDate() + (isOnTime ? offset : -offset));
    } else {
      // open task: ~50% overdue (creates "missed"), ~50% upcoming
      const isOverdue = Math.random() < 0.5;
      const offset = randInt(1, 7);
      deadline = new Date(now);
      deadline.setDate(deadline.getDate() + (isOverdue ? -offset : offset));
    }
  }

  return { status, priority, estimateMs, spentMs, createdAt, updatedAt, deadline };
}

async function generateTasks(user: SeededUser, projects: SeededProject[], count: number) {
  const now = new Date();
  console.log(`+ Generating ${count} tasks across ${projects.length} project(s)…`);

  let position = midpoint(null, null);

  for (let i = 0; i < count; i++) {
    const project = projects[Math.floor(Math.random() * projects.length)];
    const bp = blueprintFor(now);
    const title = `${SEED_TAG} ${pick(TASK_TITLES)}`;

    await prisma.task.create({
      data: {
        title,
        description: null,
        status: bp.status,
        priority: bp.priority,
        estimate: bp.estimateMs,
        spent: bp.spentMs,
        deadline: bp.deadline,
        createdAt: bp.createdAt,
        updatedAt: bp.updatedAt,
        originalProjectId: project.id,
        projects: { create: [{ projectId: project.id }] },
        sections: { create: [{ sectionId: project.sectionId, position }] },
        assignees: { create: [{ userId: user.id }] },
      },
    });

    position = midpoint(position, null);
  }

  console.log(`✓ Created ${count} tasks`);
}

async function resetSeedTasks(user: SeededUser) {
  const result = await prisma.task.deleteMany({
    where: {
      title: { startsWith: SEED_TAG },
      assignees: { some: { userId: user.id } },
    },
  });
  console.log(`× Deleted ${result.count} previously seeded tasks`);
}

async function main() {
  const args = process.argv.slice(2);

  const reset = args.includes("--reset");
  const userArg = args.find((a) => a.startsWith("--user="));

  const email = userArg ? userArg.split("=")[1] : "seed@planwise.test";
  const password = args.find((a) => a.startsWith("--password=")) ? userArg!.split("=")[1] : "Password123!";
  const taskCount = 60;

  console.log(`\n=== Seeding review data for ${email} ===\n`);

  const user = await ensureUser(email, password);

  if (reset) await resetSeedTasks(user);

  const projects = await ensureProjects(user);
  await generateTasks(user, projects, taskCount);

  console.log(`\n=== Done ===`);
  console.log(`User:     ${email}`);
  console.log(`Projects: ${projects.map((p) => p.name).join(", ")}`);
  console.log(`Tasks:    ${taskCount} (titles prefixed with "${SEED_TAG}")`);
  console.log(`\nRe-run with --reset to wipe previously seeded tasks before generating.\n`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
