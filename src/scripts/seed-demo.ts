/* eslint-disable no-console */
import { hash } from "bcrypt";

import { DefaultRole } from "@/common/enum/default-role.enum";
import { DEFAULT_ROLE_PERMISSIONS, EPermission } from "@/common/enum/permission.enum";
import { midpoint } from "@/common/utils/positioning.utils";
import { ContentType, PrismaClient as MongoPrismaClient } from "prisma/client/mongo";
import {
  ChannelType,
  NotificationType,
  PrismaClient as PgPrismaClient,
  PriorityLevel,
  TaskStatus,
} from "prisma/client/pg";

const pg = new PgPrismaClient();
const mongo = new MongoPrismaClient();

// ---------- constants ----------

const PASSWORD = "123456";

// Staggered signup days (days ago) so the admin dashboard growth chart shows a
// story: early adopters at the start of the 30-day window, recent joiners that
// light up the "new this week" metrics.
const SEED_USERS = [
  { name: "Alice", email: "alice@gmail.com", joinedDaysAgo: 29 },
  { name: "Bob", email: "bob@gmail.com", joinedDaysAgo: 24 },
  { name: "Tung", email: "tung@gmail.com", joinedDaysAgo: 16 },
  { name: "Tuan", email: "tuan@gmail.com", joinedDaysAgo: 8 },
  { name: "Tu", email: "tu@gmail.com", joinedDaysAgo: 3 },
] as const;

const SEED_EMAILS = SEED_USERS.map((u) => u.email);

const ADMIN_PASSWORD = "admin123456";

const SEED_ADMINS = [
  { fullname: "Administrator", email: "admin@planwise.id.vn", createdDaysAgo: 30 },
  { fullname: "Sarah Operations", email: "sarah.ops@planwise.id.vn", createdDaysAgo: 18 },
  { fullname: "Minh Support", email: "minh.support@planwise.id.vn", createdDaysAgo: 6 },
] as const;

const COMMENT_SNIPPETS = [
  "I can pick this up tomorrow morning.",
  "Blocked on the API change — pinged the backend channel.",
  "Done on my side, please review when you have a minute.",
  "Splitting this into two subtasks, it's bigger than estimated.",
  "Great progress here 👏",
  "Can we bump the priority? Customer asked about it twice.",
  "Added repro steps in the description.",
  "This overlaps with the work in the other section — syncing offline.",
  "Pushed a draft, feedback welcome.",
  "Deadline looks tight, anyone able to pair on this?",
  "Confirmed with design, we're good to ship.",
  "Leaving notes here so we don't lose context.",
  "Tested on staging, looks solid.",
  "Renamed for clarity and updated the estimate.",
  "Waiting on the vendor reply before this can move.",
];

// Pool of project blueprints. There are more than 5 * 6 = 30 picks needed across
// runs, so each user randomly draws a subset and the role-name triplet of each
// project differs by theme.
interface ProjectBlueprint {
  name: string;
  description: string;
  logoUrl: string;
  customRoles: { name: string; permissions: EPermission[] }[];
  taskTitles: string[];
  channels: { name: string; type: ChannelType }[];
  messageSnippets: string[];
}

const ALL_DATA_PERMS = [
  EPermission.PROJECT_CREATE_DATA,
  EPermission.PROJECT_UPDATE_DATA,
  EPermission.PROJECT_DELETE_DATA,
];

const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    name: "Aurora Web Platform",
    description: "Customer-facing web app — pricing, onboarding, billing flows.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=aurora&backgroundColor=4f46e5",
    customRoles: [
      { name: "Lead Engineer", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_UPDATE, EPermission.PROJECT_MANAGE_MEMBERS] },
      { name: "Reviewer", permissions: [EPermission.PROJECT_UPDATE_DATA] },
      { name: "QA Engineer", permissions: ALL_DATA_PERMS },
    ],
    taskTitles: [
      "Polish loading states on Kanban",
      "Refactor task modal store",
      "Audit color tokens for dark mode",
      "Wire up empty states for sections",
      "Add reduced-motion fallbacks",
      "Fix flaky drag-and-drop in Safari",
      "Sweep stale console.logs",
      "Pin Node version in CI",
      "Profile bundle size on the home route",
      "Resolve TS strict mode hits in services",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "frontend", type: ChannelType.TEXT },
      { name: "standup", type: ChannelType.VOICE },
      { name: "design-review", type: ChannelType.VIDEO },
    ],
    messageSnippets: [
      "Pushed the Kanban refactor — looks much smoother on Safari now.",
      "Anyone seen the flaky drag bug in the last build?",
      "Reviewing the modal store PR after lunch.",
      "Dark mode tokens are merged. Eyes on staging please.",
      "I'll grab the empty-state copy from product today.",
      "Loading skeletons feel snappy now, nice.",
      "Bundle size dropped ~40kb after the recharts trim.",
      "Logs are noisy in prod — opened a ticket.",
      "Standup in 5.",
      "Quick design review at 4pm?",
    ],
  },
  {
    name: "Northwind Mobile",
    description: "iOS / Android app rewrite on React Native — auth, sync, offline.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=northwind&backgroundColor=0ea5e9",
    customRoles: [
      { name: "Mobile Lead", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS] },
      { name: "iOS Developer", permissions: ALL_DATA_PERMS },
      { name: "Android Developer", permissions: ALL_DATA_PERMS },
    ],
    taskTitles: [
      "Migrate auth tokens to refresh rotation",
      "Offline cache invalidation strategy",
      "Push notifications spike",
      "Crashlytics dashboards",
      "Cold-start budget under 1.5s",
      "Resolve keyboard-shift bug on Android",
      "App icon variants for dark mode",
      "Deep links for password reset",
      "Cut unused native modules",
      "Wire up biometric unlock",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "releases", type: ChannelType.TEXT },
      { name: "pair-programming", type: ChannelType.VOICE },
    ],
    messageSnippets: [
      "TestFlight build 4.7.1 is out.",
      "Cold start back under 1.4s 🚀",
      "Anyone able to repro the keyboard bug?",
      "Refresh token rotation merged to develop.",
      "Pairing on the offline cache later today.",
      "App icon dark mode looks great.",
      "Push notifications now actually delivering on Android, finally.",
      "Beta feedback from this week is queued up in Linear.",
    ],
  },
  {
    name: "Helios Design System",
    description: "Internal design system — tokens, primitives, documentation.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=helios&backgroundColor=f59e0b",
    customRoles: [
      { name: "Art Director", permissions: [EPermission.PROJECT_UPDATE, ...ALL_DATA_PERMS] },
      { name: "Product Designer", permissions: ALL_DATA_PERMS },
      { name: "Design Critic", permissions: [EPermission.PROJECT_UPDATE_DATA] },
    ],
    taskTitles: [
      "Audit Button component variants",
      "Refresh color tokens for v3",
      "Migrate Storybook to v8",
      "Document spacing scale rationale",
      "Define motion principles",
      "Reconcile icon set with engineering",
      "Toast component a11y pass",
      "Tighten focus ring tokens",
      "Build a typography playground",
      "Cull deprecated primitives",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "critique", type: ChannelType.TEXT },
      { name: "office-hours", type: ChannelType.VIDEO },
    ],
    messageSnippets: [
      "Posted v3 color tokens in Figma.",
      "Toast a11y feels much better — opened a PR.",
      "Anyone want to critique the new motion docs?",
      "Office hours Thursday at 3 — bring your component questions.",
      "Storybook v8 migration is messy but tractable.",
      "Pulled the deprecated primitives out of the library.",
    ],
  },
  {
    name: "Magnolia Campaign",
    description: "Spring product launch — landing pages, email, paid social.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=magnolia&backgroundColor=ec4899",
    customRoles: [
      { name: "Campaign Lead", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS] },
      { name: "Copywriter", permissions: ALL_DATA_PERMS },
      { name: "Performance Analyst", permissions: [EPermission.PROJECT_UPDATE_DATA] },
    ],
    taskTitles: [
      "Draft launch email v1",
      "Pick hero photo for landing page",
      "A/B test subject lines",
      "Brief paid social agency",
      "Set up UTM taxonomy",
      "Wire up attribution dashboard",
      "Draft press kit",
      "Schedule influencer outreach",
      "Cut a 30-second teaser",
      "Localize CTAs for EU markets",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "creative", type: ChannelType.TEXT },
      { name: "weekly-sync", type: ChannelType.VOICE },
    ],
    messageSnippets: [
      "Subject-line A/B is live, results Friday.",
      "Hero photo locked in — final round of copy now.",
      "UTM taxonomy doc is in the drive.",
      "Press kit feedback by Wednesday please.",
      "Sync at 11 tomorrow.",
      "Performance numbers from week 1 look very strong.",
    ],
  },
  {
    name: "Atlas Roadmap",
    description: "Cross-team product roadmap, OKRs, and quarterly planning.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=atlas&backgroundColor=10b981",
    customRoles: [
      { name: "Product Manager", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS, EPermission.PROJECT_UPDATE] },
      { name: "Engineering Stakeholder", permissions: [EPermission.PROJECT_UPDATE_DATA] },
      { name: "Beta Tester", permissions: [EPermission.PROJECT_CREATE_DATA] },
    ],
    taskTitles: [
      "Draft Q3 OKRs",
      "Pricing experiments shortlist",
      "Retention deep-dive",
      "Onboarding nudge spike",
      "Bug bash for v2.1",
      "Customer interview script",
      "Score the feature backlog",
      "Quarterly planning offsite agenda",
      "Renew the design partner program",
      "Update the roadmap doc",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "ideas", type: ChannelType.TEXT },
      { name: "planning", type: ChannelType.VIDEO },
      { name: "beta-feedback", type: ChannelType.TEXT },
    ],
    messageSnippets: [
      "Q3 OKR draft is in the drive — comments by Friday.",
      "Top 3 retention experiments shortlisted.",
      "Bug bash this Thursday, all hands welcome.",
      "Customer interview script v2 attached.",
      "Beta feedback from Magnolia users is glowing.",
      "Planning offsite agenda locked.",
    ],
  },
  {
    name: "Polaris Research",
    description: "User research repository — interview notes, synthesis, insights.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=polaris&backgroundColor=8b5cf6",
    customRoles: [
      { name: "Principal Researcher", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS] },
      { name: "UX Researcher", permissions: ALL_DATA_PERMS },
      { name: "Research Advisor", permissions: [EPermission.PROJECT_UPDATE_DATA] },
    ],
    taskTitles: [
      "Recruit 8 SMB customers for diary study",
      "Synthesize week-1 interview notes",
      "Top-task analysis for dashboard",
      "Heuristic eval of new pricing page",
      "Set up the research repo taxonomy",
      "Draft research charter for FY26",
      "Pilot the unmoderated study",
      "Build affinity diagram from interviews",
      "Code 20 sessions for jobs-to-be-done",
      "Share insights digest with the org",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "interviews", type: ChannelType.TEXT },
      { name: "synthesis", type: ChannelType.VIDEO },
    ],
    messageSnippets: [
      "Synthesis is live — 4 top themes emerged.",
      "Diary study recruiting is at 6 of 8.",
      "Top-task ranks are in the repo.",
      "Affinity diagram board is shared.",
      "Insights digest goes out Monday.",
      "Pricing page heuristic eval surfaced 12 issues.",
    ],
  },
  {
    name: "Equinox Conference",
    description: "Annual customer conference — logistics, sessions, sponsors.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=equinox&backgroundColor=06b6d4",
    customRoles: [
      { name: "Event Coordinator", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS, EPermission.PROJECT_UPDATE] },
      { name: "Vendor Liaison", permissions: [EPermission.PROJECT_UPDATE_DATA] },
      { name: "Volunteer", permissions: [EPermission.PROJECT_CREATE_DATA] },
    ],
    taskTitles: [
      "Lock the venue",
      "Sponsorship tier pricing",
      "Speaker outreach round 1",
      "AV vendor quotes",
      "Print swag samples",
      "Run-of-show v1",
      "Volunteer training session",
      "Catering tasting",
      "Badge design",
      "Post-event survey draft",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "speakers", type: ChannelType.TEXT },
      { name: "volunteers", type: ChannelType.VOICE },
    ],
    messageSnippets: [
      "Venue locked — contract signed today.",
      "Two more speakers confirmed for the keynote block.",
      "AV quotes are in, picking Friday.",
      "Volunteer training Thursday 6pm.",
      "Catering tasting was great, going with option B.",
      "Badges proof should arrive next week.",
    ],
  },
  {
    name: "Tempest Content Calendar",
    description: "Editorial calendar — blog, newsletter, social posts.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=tempest&backgroundColor=ef4444",
    customRoles: [
      { name: "Managing Editor", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_UPDATE] },
      { name: "Staff Writer", permissions: ALL_DATA_PERMS },
      { name: "Proofreader", permissions: [EPermission.PROJECT_UPDATE_DATA] },
    ],
    taskTitles: [
      "Outline launch-week blog post",
      "Edit guest essay on async work",
      "Schedule April newsletter",
      "Source quotes for case study",
      "Draft social posts for product launch",
      "Final pass on the FAQ rewrite",
      "Pitch SEO topics for May",
      "Update the style guide",
      "Recommission the changelog page",
      "Refresh author bios",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "drafts", type: ChannelType.TEXT },
      { name: "edits", type: ChannelType.VIDEO },
    ],
    messageSnippets: [
      "Newsletter scheduled for Tuesday 9am.",
      "Guest essay is fantastic — minor edits only.",
      "Social posts queued in Buffer.",
      "Style guide update is in review.",
      "FAQ rewrite landed.",
      "Author bios refreshed across the site.",
    ],
  },
  {
    name: "Vanguard Sales Pipeline",
    description: "Enterprise sales pipeline, account research, RFP responses.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=vanguard&backgroundColor=f97316",
    customRoles: [
      { name: "Account Executive", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS] },
      { name: "Sales Development Rep", permissions: ALL_DATA_PERMS },
      { name: "Deal Analyst", permissions: [EPermission.PROJECT_UPDATE_DATA] },
    ],
    taskTitles: [
      "Discovery call: Acme Corp",
      "RFP response — Globex",
      "Build pricing comp deck",
      "Pipeline review for Q3",
      "Update CRM hygiene playbook",
      "Cold outbound experiment v2",
      "Customer reference round-up",
      "Renewal kickoff with Initech",
      "Competitive battlecard refresh",
      "Forecast review with finance",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "deals", type: ChannelType.TEXT },
      { name: "pipeline-review", type: ChannelType.VOICE },
    ],
    messageSnippets: [
      "Globex RFP draft up for review.",
      "Pipeline review at 2.",
      "Acme discovery went really well.",
      "Battlecard against Initech is refreshed.",
      "Forecast for Q3 is on track.",
      "Renewals book looking healthy.",
    ],
  },
  {
    name: "Bedrock Infrastructure",
    description: "Platform reliability — incidents, SLOs, on-call rotation.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=bedrock&backgroundColor=64748b",
    customRoles: [
      { name: "Incident Commander", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS, EPermission.PROJECT_UPDATE] },
      { name: "On-call Engineer", permissions: ALL_DATA_PERMS },
      { name: "Reliability Auditor", permissions: [EPermission.PROJECT_UPDATE_DATA] },
    ],
    taskTitles: [
      "Postmortem for the Mar 12 outage",
      "Define SLOs for the API gateway",
      "Rotate Kafka credentials",
      "Tame noisy alerts in PagerDuty",
      "Build runbook for cache stampede",
      "Patch the Redis CVE",
      "Game day exercise planning",
      "Quarterly reliability review",
      "Migrate cron jobs to Argo",
      "Audit Terraform drift",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "incidents", type: ChannelType.TEXT },
      { name: "war-room", type: ChannelType.VIDEO },
      { name: "on-call-chat", type: ChannelType.VOICE },
    ],
    messageSnippets: [
      "API gateway p95 is back to normal.",
      "Redis CVE patched in staging — pushing to prod tomorrow.",
      "Postmortem doc is ready for review.",
      "Alert noise is down 60% after the dedup pass.",
      "Game day scheduled for next Friday afternoon.",
      "Terraform drift report attached.",
    ],
  },
  {
    name: "Lumen Hiring",
    description: "Engineering hiring — pipeline, interviews, leveling.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=lumen&backgroundColor=22c55e",
    customRoles: [
      { name: "Recruiter", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS] },
      { name: "Interviewer", permissions: ALL_DATA_PERMS },
      { name: "Hiring Manager", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_UPDATE] },
    ],
    taskTitles: [
      "Refresh the JD for senior frontend",
      "Calibrate system design rubric",
      "Source 30 candidates for backend",
      "Onboarding plan for new hires",
      "Interview training session",
      "Audit the take-home for fairness",
      "Schedule onsite for Mehmet",
      "Update leveling guidelines",
      "Diversity sourcing initiative",
      "Quarterly hiring debrief",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "debriefs", type: ChannelType.TEXT },
      { name: "calibration", type: ChannelType.VIDEO },
    ],
    messageSnippets: [
      "JD for senior frontend is live.",
      "Calibration session Thursday at 4.",
      "Onsite scheduled for Mehmet next Tuesday.",
      "Take-home audit looking promising.",
      "Sourcing pipeline is at 30 for backend.",
      "Leveling doc updated, please re-read.",
    ],
  },
  {
    name: "Cobalt Mobile Web",
    description: "Mobile web parity — Lighthouse, Core Web Vitals, A/B tests.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=cobalt&backgroundColor=3b82f6",
    customRoles: [
      { name: "Performance Lead", permissions: [...ALL_DATA_PERMS, EPermission.PROJECT_MANAGE_MEMBERS] },
      { name: "Frontend Engineer", permissions: ALL_DATA_PERMS },
      { name: "Web Analyst", permissions: [EPermission.PROJECT_UPDATE_DATA] },
    ],
    taskTitles: [
      "LCP under 2.5s on /pricing",
      "CLS budget for product cards",
      "Lazy-load hero illustration",
      "Inline critical CSS",
      "Swap webp for avif",
      "Cut unused fonts",
      "Tighten cache headers",
      "Lighthouse CI in pipeline",
      "Long-tasks audit",
      "Move third-party scripts to a sandbox",
    ],
    channels: [
      { name: "general", type: ChannelType.TEXT },
      { name: "core-web-vitals", type: ChannelType.TEXT },
      { name: "weekly-perf", type: ChannelType.VOICE },
    ],
    messageSnippets: [
      "LCP on pricing is 2.3 now 🎉",
      "AVIF rollout looks clean on Chrome and Safari.",
      "Lighthouse CI is gating PRs as of today.",
      "Long tasks down 35% after the script sandbox.",
      "Weekly perf sync moved to Friday.",
      "CLS regression on product cards — investigating.",
    ],
  },
];

// ---------- utilities ----------

function rand<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickN<T>(arr: readonly T[], n: number): T[] {
  const a = [...arr];
  const picked: T[] = [];
  for (let i = 0; i < n && a.length > 0; i++) {
    const idx = Math.floor(Math.random() * a.length);
    picked.push(a.splice(idx, 1)[0]);
  }
  return picked;
}

function pickWeighted<T>(weights: { value: T; weight: number }[]): T {
  const total = weights.reduce((s, w) => s + w.weight, 0);
  let roll = Math.random() * total;
  for (const w of weights) {
    if ((roll -= w.weight) <= 0) return w.value;
  }
  return weights[weights.length - 1].value;
}

function nextPosition(prev: string | null): string {
  return midpoint(prev, null);
}

function hoursAgo(h: number): Date {
  return new Date(Date.now() - h * 60 * 60 * 1000);
}

function hoursFromNow(h: number): Date {
  return new Date(Date.now() + h * 60 * 60 * 1000);
}

function minutesAgo(m: number): Date {
  return new Date(Date.now() - m * 60 * 1000);
}

function daysAgoAt(days: number, hour?: number): Date {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  d.setHours(hour ?? randInt(8, 21), randInt(0, 59), randInt(0, 59), 0);
  return d;
}

/** Random date between two dates, never in the future. */
function randomDateBetween(from: Date, to: Date): Date {
  const lo = from.getTime();
  const hi = Math.min(to.getTime(), Date.now());
  if (hi <= lo) return new Date(lo);
  return new Date(lo + Math.random() * (hi - lo));
}

// ---------- types ----------

interface SeededUser {
  id: string;
  email: string;
  fullname: string;
  avatarUrl: string | null;
  workspaceId: string;
  createdAt: Date;
}

interface SeededProjectRole {
  id: string;
  name: string;
}

interface SeededProject {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  ownerId: string;
  roles: SeededProjectRole[]; // includes default OWNER/MEMBER + 3 customs
  defaultMemberRoleId: string; // the MEMBER role id (for new-member invites)
  sectionIds: string[]; // 4 ids
  memberUserIds: string[]; // owner + others
  channelIds: string[]; // all
  textChannelIds: string[];
  taskIds: string[]; // ids of seeded tasks (length === 30)
}

interface SeededTask {
  id: string;
  title: string;
  status: TaskStatus;
  priority: PriorityLevel;
  deadline: Date | null;
  sectionId: string;
  projectId: string;
}

// ---------- wipe ----------

async function wipe() {
  console.log("× Wiping previous demo seed…");

  const users = await pg.user.findMany({ where: { email: { in: SEED_EMAILS } }, select: { id: true } });
  const userIds = users.map((u) => u.id);

  if (userIds.length === 0) {
    console.log("  (no existing seed users — nothing to wipe)");
    return;
  }

  // Collect channel ids belonging to projects owned by any seed user so we can
  // clean Mongo before cascade deletes the channels in Postgres.
  const channels = await pg.channel.findMany({
    where: { project: { ownerId: { in: userIds } } },
    select: { id: true },
  });
  const channelIds = channels.map((c) => c.id);

  if (channelIds.length > 0) {
    const deletedMessages = await mongo.message.deleteMany({ where: { channelId: { in: channelIds } } });
    console.log(`  Mongo: deleted ${deletedMessages.count} messages across ${channelIds.length} channels`);
  }

  // Delete invitations *to* seed users from non-seed users first (cascade only
  // covers the seed-user side; safe even if redundant).
  await pg.projectInvitation.deleteMany({
    where: { OR: [{ inviteeId: { in: userIds } }, { inviterId: { in: userIds } }] },
  });

  // Channel.projectId has no cascade in the schema, so deleting projects (via
  // user-cascade) would fail on the FK. Drop channels explicitly first.
  if (channelIds.length > 0) {
    await pg.channel.deleteMany({ where: { id: { in: channelIds } } });
  }

  // Postgres cascade: deleting users removes their owned projects, which
  // cascades to sections, tasks, comments, members, roles, notifications, and
  // (now) channels are already gone.
  const deletedUsers = await pg.user.deleteMany({ where: { id: { in: userIds } } });
  console.log(`  Postgres: deleted ${deletedUsers.count} users (cascaded to their projects/tasks/notifications)`);
}

// ---------- users ----------

async function createUsers(): Promise<SeededUser[]> {
  console.log("+ Creating 5 users with personal workspaces…");
  const hashed = await hash(PASSWORD, 10);
  const out: SeededUser[] = [];

  for (const u of SEED_USERS) {
    const avatarUrl = `https://i.pravatar.cc/150?u=${encodeURIComponent(u.email)}`;
    // Staggered signup timestamps make the dashboard growth chart tell a story.
    const joinedAt = daysAgoAt(u.joinedDaysAgo);
    const created = await pg.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name: `${u.name}'s Workspace`,
          isPersonal: true,
          createdAt: joinedAt,
          owner: {
            create: {
              email: u.email,
              password: hashed,
              fullname: u.name,
              avatarUrl,
              verified: true,
              workspaceId: "",
              createdAt: joinedAt,
            },
          },
          sections: { create: [{ name: "Default", position: nextPosition(null) }] },
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
    });

    out.push({
      id: created.id,
      email: created.email,
      fullname: created.fullname,
      avatarUrl: created.avatarUrl,
      workspaceId: created.workspaceId,
      createdAt: joinedAt,
    });
    console.log(`  ✓ ${u.name} (${u.email}) — joined ${u.joinedDaysAgo}d ago`);
  }

  return out;
}

// ---------- my-tasks (personal workspace) ----------

const MY_TASK_SECTION_POOL = ["Inbox", "Today", "This Week", "Someday", "Errands", "Focus", "Reading"];

const PERSONAL_TASK_TITLES = [
  "Reply to recruiter email",
  "Book flight for offsite",
  "Update LinkedIn headline",
  "Renew library books",
  "Pay credit card bill",
  "Schedule dentist appointment",
  "Read 'Designing Data-Intensive Applications' ch.6",
  "Write weekly retrospective",
  "Grocery run",
  "Yoga at 7am",
  "Sketch ideas for side project",
  "Call grandma",
  "Pick up dry cleaning",
  "File last quarter's expenses",
  "Plan birthday dinner",
  "Plant the basil seedlings",
  "Back up laptop",
  "Cancel unused subscriptions",
  "Practice piano for 30 min",
  "Draft blog post on hooks",
  "Test new espresso recipe",
  "Repot the fiddle leaf",
  "Buy new running shoes",
  "Renew passport",
  "Tidy the downloads folder",
];

async function seedMyTasks(user: SeededUser) {
  // Find the default section that was created with the workspace; we'll keep
  // it and add 4–5 more named sections beside it.
  const defaultSection = await pg.section.findFirst({
    where: { projectId: user.workspaceId },
    orderBy: { position: "asc" },
  });
  if (!defaultSection) throw new Error(`No default section for ${user.email}`);

  const extraSectionCount = randInt(4, 5);
  const extraNames = pickN(MY_TASK_SECTION_POOL, extraSectionCount);

  let lastPos: string = defaultSection.position;
  const sections: { id: string; name: string }[] = [{ id: defaultSection.id, name: "Default" }];
  for (const name of extraNames) {
    lastPos = nextPosition(lastPos);
    const s = await pg.section.create({
      data: { projectId: user.workspaceId, name, position: lastPos },
    });
    sections.push({ id: s.id, name });
  }

  // 6–15 tasks per section
  for (const section of sections) {
    const count = randInt(6, 15);
    let taskPos: string | null = null;
    for (let i = 0; i < count; i++) {
      taskPos = nextPosition(taskPos);
      const bp = personalTaskBlueprint(user.createdAt);
      await pg.task.create({
        data: {
          title: rand(PERSONAL_TASK_TITLES),
          description: null,
          status: bp.status,
          priority: bp.priority,
          estimate: bp.estimateMs,
          spent: bp.spentMs,
          deadline: bp.deadline,
          createdAt: bp.createdAt,
          updatedAt: bp.updatedAt,
          originalProjectId: user.workspaceId,
          projects: { create: [{ projectId: user.workspaceId }] },
          sections: { create: [{ sectionId: section.id, position: taskPos! }] },
          assignees: { create: [{ userId: user.id }] },
        },
      });
    }
  }
  console.log(`  ✓ my-tasks for ${user.email}: ${sections.length} sections`);
}

function personalTaskBlueprint(userCreatedAt?: Date) {
  const now = new Date();
  const updatedDaysAgo = randInt(0, 30);
  const updatedAt = new Date(now);
  updatedAt.setDate(updatedAt.getDate() - updatedDaysAgo);
  updatedAt.setHours(randInt(8, 20), randInt(0, 59), 0, 0);
  let createdAt = new Date(updatedAt);
  createdAt.setDate(createdAt.getDate() - randInt(0, 10));

  // Tasks can't predate the account that owns the workspace.
  if (userCreatedAt && createdAt < userCreatedAt) {
    createdAt = new Date(userCreatedAt.getTime() + randInt(5, 600) * 60 * 1000);
  }
  if (updatedAt < createdAt) {
    updatedAt.setTime(Math.min(createdAt.getTime() + randInt(1, 48) * 60 * 60 * 1000, now.getTime()));
  }

  const status = pickWeighted([
    { value: TaskStatus.TODO, weight: 5 },
    { value: TaskStatus.RUNNING, weight: 2 },
    { value: TaskStatus.DONE, weight: 4 },
  ]);
  const priority = pickWeighted([
    { value: PriorityLevel.LOW, weight: 2 },
    { value: PriorityLevel.NORMAL, weight: 6 },
    { value: PriorityLevel.HIGH, weight: 2 },
    { value: PriorityLevel.URGENT, weight: 1 },
  ]);
  const estimateMs = randInt(15, 180) * 60 * 1000;
  const ratio = pickWeighted([
    { value: 0.5, weight: 2 },
    { value: 1.0, weight: 4 },
    { value: 1.5, weight: 2 },
  ]);
  const spentMs = Math.round(estimateMs * ratio);

  let deadline: Date | null = null;
  if (Math.random() < 0.6) {
    const offset = randInt(-7, 14);
    deadline = new Date(now);
    deadline.setDate(deadline.getDate() + offset);
    deadline.setHours(randInt(9, 18), 0, 0, 0);
  }

  return { status, priority, estimateMs, spentMs, deadline, createdAt, updatedAt };
}

// ---------- shared projects ----------

async function seedSharedProject(
  blueprint: ProjectBlueprint,
  owner: SeededUser,
  memberPool: SeededUser[],
  projectCreatedAt: Date,
): Promise<SeededProject> {
  // Vary team size per project (2–6 incl. owner) so the admin project list and
  // "top projects" chart don't show identical member counts everywhere.
  const additionalCount = pickWeighted([
    { value: 1, weight: 2 },
    { value: 2, weight: 3 },
    { value: 3, weight: 3 },
    { value: 4, weight: 2 },
  ]);
  const additional = pickN(memberPool, Math.min(additionalCount, memberPool.length));
  const sectionNames = ["Backlog", "In Progress", "Review", "Done"];

  // Create project + roles + sections in one transaction so the project never
  // ends up half-formed if anything fails.
  const created = await pg.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: blueprint.name,
        description: blueprint.description,
        logoUrl: blueprint.logoUrl,
        isPersonal: false,
        ownerId: owner.id,
        createdAt: projectCreatedAt,
        sections: {
          create: sectionNames.map((n, i) => {
            // Pre-compute deterministic ascending positions
            let pos: string | null = null;
            for (let k = 0; k <= i; k++) pos = nextPosition(pos);
            return { name: n, position: pos! };
          }),
        },
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
            ...blueprint.customRoles.map((r) => ({
              name: r.name,
              default: false,
              permissions: JSON.stringify(r.permissions),
            })),
          ],
        },
        channels: {
          create: blueprint.channels.map((c) => ({ name: c.name, type: c.type })),
        },
      },
      include: { sections: { orderBy: { position: "asc" } }, roles: true, channels: true },
    });

    const ownerRole = project.roles.find((r) => r.name === (DefaultRole.OWNER as string))!;
    const memberRole = project.roles.find((r) => r.name === (DefaultRole.MEMBER as string))!;

    // Owner membership
    await tx.projectMember.create({
      data: { projectId: project.id, userId: owner.id, roleId: ownerRole.id },
    });

    // Add additional members: each gets a randomized role mix (mostly custom,
    // some default MEMBER) so the demo shows roles really being used.
    for (const m of additional) {
      const assignedRole = pickWeighted([
        { value: memberRole, weight: 2 },
        ...project.roles.filter((r) => !r.default).map((r) => ({ value: r, weight: 2 })),
      ]);
      await tx.projectMember.create({
        data: { projectId: project.id, userId: m.id, roleId: assignedRole.id },
      });
    }

    return { project, additional };
  });

  const { project } = created;
  const sectionIds = project.sections.map((s) => s.id);
  const channelIds = project.channels.map((c) => c.id);
  const textChannelIds = project.channels.filter((c) => c.type === ChannelType.TEXT).map((c) => c.id);
  const memberUserIds = [owner.id, ...additional.map((m) => m.id)];

  // Tasks: 30, distributed roughly evenly across the 4 sections.
  const taskIds: string[] = [];
  const tasksPerSection = [8, 8, 7, 7];
  for (let sIdx = 0; sIdx < sectionIds.length; sIdx++) {
    let taskPos: string | null = null;
    for (let i = 0; i < tasksPerSection[sIdx]; i++) {
      taskPos = nextPosition(taskPos);
      const bp = projectTaskBlueprint(sIdx, projectCreatedAt);
      const title = rand(blueprint.taskTitles);
      const assigneeIds = pickN(memberUserIds, randInt(1, Math.min(2, memberUserIds.length)));

      const task = await pg.task.create({
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
          sections: { create: [{ sectionId: sectionIds[sIdx], position: taskPos! }] },
          assignees: { create: assigneeIds.map((uid) => ({ userId: uid })) },
        },
      });
      taskIds.push(task.id);
    }
  }

  // Mongo messages for TEXT channels
  let totalMessages = 0;
  for (const chId of textChannelIds) {
    const count = randInt(15, 40);
    const docs: {
      channelId: string;
      senderId: string;
      content: string;
      contentType: ContentType;
      createdAt: Date;
    }[] = [];
    // Spread messages between project creation (capped at 14 days back) and now.
    const messagesFrom = new Date(Math.max(projectCreatedAt.getTime(), Date.now() - 14 * 24 * 60 * 60 * 1000));
    for (let i = 0; i < count; i++) {
      docs.push({
        channelId: chId,
        senderId: rand(memberUserIds),
        content: rand(blueprint.messageSnippets),
        contentType: ContentType.TEXT,
        createdAt: randomDateBetween(messagesFrom, new Date()),
      });
    }
    await mongo.message.createMany({ data: docs });
    totalMessages += count;
  }

  const rolesOut: SeededProjectRole[] = project.roles.map((r) => ({ id: r.id, name: r.name }));
  const defaultMemberRoleId = project.roles.find((r) => r.name === (DefaultRole.MEMBER as string))!.id;

  console.log(
    `  ✓ "${project.name}" (owner=${owner.email}, ${1 + additional.length} members, ` +
      `${project.channels.length} channels, 30 tasks, ${totalMessages} msgs)`,
  );

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    logoUrl: project.logoUrl,
    ownerId: project.ownerId,
    roles: rolesOut,
    defaultMemberRoleId,
    sectionIds,
    memberUserIds,
    channelIds,
    textChannelIds,
    taskIds,
  };
}

function projectTaskBlueprint(sectionIdx: number, projectCreatedAt?: Date) {
  // Section 0=Backlog, 1=In Progress, 2=Review, 3=Done — bias status by column.
  const status =
    sectionIdx === 0
      ? TaskStatus.TODO
      : sectionIdx === 1
        ? TaskStatus.RUNNING
        : sectionIdx === 2
          ? pickWeighted([
              { value: TaskStatus.RUNNING, weight: 2 },
              { value: TaskStatus.TODO, weight: 1 },
            ])
          : TaskStatus.DONE;

  const priority = pickWeighted([
    { value: PriorityLevel.LOW, weight: 1 },
    { value: PriorityLevel.NORMAL, weight: 5 },
    { value: PriorityLevel.HIGH, weight: 3 },
    { value: PriorityLevel.URGENT, weight: 1 },
  ]);

  const now = new Date();
  const updatedDaysAgo = randInt(0, 21);
  const updatedAt = new Date(now);
  updatedAt.setDate(updatedAt.getDate() - updatedDaysAgo);
  updatedAt.setHours(randInt(8, 19), randInt(0, 59), 0, 0);
  let createdAt = new Date(updatedAt);
  createdAt.setDate(createdAt.getDate() - randInt(1, 14));

  // Tasks can't predate their project.
  if (projectCreatedAt && createdAt < projectCreatedAt) {
    createdAt = new Date(projectCreatedAt.getTime() + randInt(1, 48) * 60 * 60 * 1000);
    if (createdAt > now) createdAt = new Date(projectCreatedAt.getTime() + randInt(5, 120) * 60 * 1000);
  }
  if (updatedAt < createdAt) {
    updatedAt.setTime(Math.min(createdAt.getTime() + randInt(1, 72) * 60 * 60 * 1000, now.getTime()));
  }

  const estimateMs = randInt(30, 240) * 60 * 1000;
  const ratio = pickWeighted([
    { value: 0.6, weight: 2 },
    { value: 0.9, weight: 4 },
    { value: 1.1, weight: 3 },
    { value: 1.6, weight: 1 },
  ]);
  const spentMs = status === TaskStatus.TODO ? 0 : Math.round(estimateMs * ratio);

  let deadline: Date | null = null;
  if (Math.random() < 0.65) {
    if (status === TaskStatus.DONE) {
      // Deadline before or around updatedAt (already completed)
      const offset = randInt(-5, 3);
      deadline = new Date(updatedAt);
      deadline.setDate(deadline.getDate() + offset);
    } else {
      // Open task: 40% overdue, 60% upcoming, in the next/last ~10 days
      const isOverdue = Math.random() < 0.4;
      const offset = randInt(1, 10);
      deadline = new Date(now);
      deadline.setDate(deadline.getDate() + (isOverdue ? -offset : offset));
      deadline.setHours(randInt(9, 18), 0, 0, 0);
    }
  }

  return { status, priority, estimateMs, spentMs, deadline, createdAt, updatedAt };
}

// ---------- comments ----------

async function seedComments(projects: SeededProject[]) {
  console.log("+ Creating task comments…");
  let total = 0;

  for (const project of projects) {
    // Comment on roughly a third of the project's tasks.
    const tasks = await pg.task.findMany({
      where: { id: { in: pickN(project.taskIds, randInt(8, 14)) } },
      select: { id: true, createdAt: true },
    });

    for (const task of tasks) {
      const commentCount = randInt(1, 4);
      let parentId: string | null = null;

      for (let i = 0; i < commentCount; i++) {
        const authorId = rand(project.memberUserIds);
        const createdAt = randomDateBetween(task.createdAt, new Date());
        const comment = await pg.comment.create({
          data: {
            content: rand(COMMENT_SNIPPETS),
            authorId,
            taskId: task.id,
            createdAt,
            // ~25% of follow-ups land as a threaded reply to the first comment
            parentId: parentId && Math.random() < 0.25 ? parentId : null,
          },
        });
        parentId = parentId ?? comment.id;
        total++;
      }
    }
  }

  console.log(`  ✓ ${total} comments across ${projects.length} projects`);
}

// ---------- admins ----------

async function seedAdmins() {
  console.log("+ Creating admin accounts…");
  const hashed = await hash(ADMIN_PASSWORD, 10);

  for (const a of SEED_ADMINS) {
    await pg.admin.upsert({
      where: { email: a.email },
      update: { password: hashed, fullname: a.fullname },
      create: {
        email: a.email,
        password: hashed,
        fullname: a.fullname,
        createdAt: daysAgoAt(a.createdDaysAgo),
      },
    });
    console.log(`  ✓ ${a.fullname} (${a.email})`);
  }
}

// ---------- pending invitations ----------

async function seedPendingInvitations(users: SeededUser[], projects: SeededProject[]) {
  console.log("+ Creating pending project invitations…");
  // For each user (invitee), find 1–2 projects owned by another seed user that
  // the invitee is NOT already a member of, and create a PENDING invitation.
  for (const invitee of users) {
    const candidates = projects.filter(
      (p) => p.ownerId !== invitee.id && !p.memberUserIds.includes(invitee.id),
    );
    if (candidates.length === 0) continue;
    const picks = pickN(candidates, Math.min(2, candidates.length));
    for (const project of picks) {
      const inviterId = project.ownerId;
      // Use a non-OWNER role so the invitee role-up makes sense; prefer a custom role.
      const inviteRole =
        project.roles.find((r) => r.name !== DefaultRole.OWNER && r.name !== DefaultRole.MEMBER) ??
        project.roles.find((r) => r.name === DefaultRole.MEMBER)!;
      await pg.projectInvitation.create({
        data: {
          inviteeId: invitee.id,
          inviterId,
          projectId: project.id,
          roleId: inviteRole.id,
        },
      });
    }
    console.log(`  ✓ ${invitee.email}: ${picks.length} pending invite(s)`);
  }
}

// ---------- notifications ----------

function actorPayload(u: SeededUser) {
  return { id: u.id, fullname: u.fullname, avatarUrl: u.avatarUrl };
}

function projectPayload(p: SeededProject) {
  return { id: p.id, name: p.name, description: p.description, logoUrl: p.logoUrl };
}

function rolePayload(role: SeededProjectRole) {
  return { id: role.id, name: role.name };
}

function taskPayload(task: SeededTask) {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
    sectionId: task.sectionId,
  };
}

async function seedNotifications(
  users: SeededUser[],
  usersByEmail: Map<string, SeededUser>,
  projects: SeededProject[],
) {
  console.log("+ Creating 20 notifications per user…");
  const projectsByOwner = new Map<string, SeededProject[]>();
  for (const p of projects) {
    const arr = projectsByOwner.get(p.ownerId) ?? [];
    arr.push(p);
    projectsByOwner.set(p.ownerId, arr);
  }

  for (const recipient of users) {
    // Tasks the recipient is involved with (assigned to them across all projects)
    const recipientTasksRaw = await pg.task.findMany({
      where: { assignees: { some: { userId: recipient.id } } },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        deadline: true,
        originalProjectId: true,
        sections: { select: { sectionId: true }, take: 1 },
      },
      take: 200,
    });
    const recipientTasks: SeededTask[] = recipientTasksRaw
      .filter((t) => t.sections.length > 0)
      .map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        deadline: t.deadline,
        sectionId: t.sections[0].sectionId,
        projectId: t.originalProjectId,
      }));

    const projectsById = new Map(projects.map((p) => [p.id, p]));
    const sharedProjectsRecipientIsIn = projects.filter((p) => p.memberUserIds.includes(recipient.id));

    // Get the recipient's pending invitations so we can mirror them in PROJECT_INVITATION notifications
    const pendingInvites = await pg.projectInvitation.findMany({
      where: { inviteeId: recipient.id, status: "PENDING" },
      include: { project: true, role: true, inviter: true },
    });

    const drafts: {
      type: NotificationType;
      isRead: boolean;
      createdAt: Date;
      projectId: string | null;
      taskId: string | null;
      payload: unknown;
    }[] = [];

    // 1) PROJECT_INVITATION × one per pending invite
    for (const inv of pendingInvites) {
      const proj = projectsById.get(inv.projectId);
      const inviter = usersByEmail.get(inv.inviter.email);
      if (!proj || !inviter) continue;
      drafts.push({
        type: NotificationType.PROJECT_INVITATION,
        isRead: false,
        createdAt: minutesAgo(randInt(5, 60)),
        projectId: proj.id,
        taskId: null,
        payload: {
          project: projectPayload(proj),
          role: { id: inv.role.id, name: inv.role.name },
          inviter: actorPayload(inviter),
        },
      });
    }

    // 2) TASK_DEADLINE_REMINDER × upcoming-deadline tasks (≤ 48h)
    const upcoming = recipientTasks.filter(
      (t) => t.deadline && t.deadline.getTime() > Date.now() && t.deadline.getTime() - Date.now() < 48 * 60 * 60 * 1000,
    );
    for (const t of upcoming.slice(0, 4)) {
      const proj = projectsById.get(t.projectId);
      drafts.push({
        type: NotificationType.TASK_DEADLINE_REMINDER,
        isRead: Math.random() < 0.3,
        createdAt: minutesAgo(randInt(10, 180)),
        projectId: proj?.id ?? null,
        taskId: t.id,
        payload: { task: taskPayload(t), project: proj ? projectPayload(proj) : null },
      });
    }

    // 3) TASK_DEADLINE_MISSED × past-deadline open tasks
    const missed = recipientTasks.filter(
      (t) => t.deadline && t.deadline.getTime() < Date.now() && t.status !== TaskStatus.DONE,
    );
    for (const t of missed.slice(0, 4)) {
      const proj = projectsById.get(t.projectId);
      drafts.push({
        type: NotificationType.TASK_DEADLINE_MISSED,
        isRead: Math.random() < 0.4,
        createdAt: minutesAgo(randInt(60, 60 * 24 * 3)),
        projectId: proj?.id ?? null,
        taskId: t.id,
        payload: { task: taskPayload(t), project: proj ? projectPayload(proj) : null },
      });
    }

    // 4) TASK_ASSIGNED — recent assignments by teammates in shared projects
    const sharedTasks = recipientTasks.filter((t) => {
      const p = projectsById.get(t.projectId);
      return p && !p.id.includes(recipient.workspaceId) && p.memberUserIds.length > 1;
    });
    for (const t of sharedTasks.slice(0, 4)) {
      const proj = projectsById.get(t.projectId);
      if (!proj) continue;
      const otherMembers = proj.memberUserIds.filter((id) => id !== recipient.id);
      if (otherMembers.length === 0) continue;
      const actorId = rand(otherMembers);
      const actor = users.find((u) => u.id === actorId);
      if (!actor) continue;
      drafts.push({
        type: NotificationType.TASK_ASSIGNED,
        isRead: Math.random() < 0.5,
        createdAt: minutesAgo(randInt(30, 60 * 24 * 2)),
        projectId: proj.id,
        taskId: t.id,
        payload: {
          task: taskPayload(t),
          project: projectPayload(proj),
          actor: actorPayload(actor),
        },
      });
    }

    // 5) TASK_UPDATED — same shape, different actors / changes
    for (const t of sharedTasks.slice(0, 3)) {
      const proj = projectsById.get(t.projectId);
      if (!proj) continue;
      const otherMembers = proj.memberUserIds.filter((id) => id !== recipient.id);
      if (otherMembers.length === 0) continue;
      const actor = users.find((u) => u.id === rand(otherMembers));
      if (!actor) continue;
      const changeOptions = [["status"], ["priority"], ["deadline"], ["status", "priority"], ["deadline", "priority"]];
      drafts.push({
        type: NotificationType.TASK_UPDATED,
        isRead: Math.random() < 0.6,
        createdAt: minutesAgo(randInt(60, 60 * 24 * 4)),
        projectId: proj.id,
        taskId: t.id,
        payload: {
          task: taskPayload(t),
          project: projectPayload(proj),
          actor: actorPayload(actor),
          changes: rand(changeOptions),
        },
      });
    }

    // 6) PROJECT_NEW_MEMBER — for projects the recipient is in, someone else joined
    for (const proj of sharedProjectsRecipientIsIn.slice(0, 2)) {
      const otherMembers = proj.memberUserIds.filter((id) => id !== recipient.id);
      if (otherMembers.length === 0) continue;
      const newMember = users.find((u) => u.id === rand(otherMembers));
      if (!newMember) continue;
      const role = proj.roles.find((r) => r.name === DefaultRole.MEMBER) ?? proj.roles[0];
      drafts.push({
        type: NotificationType.PROJECT_NEW_MEMBER,
        isRead: Math.random() < 0.5,
        createdAt: minutesAgo(randInt(60 * 6, 60 * 24 * 6)),
        projectId: proj.id,
        taskId: null,
        payload: {
          project: projectPayload(proj),
          newMember: actorPayload(newMember),
          role: rolePayload(role),
        },
      });
    }

    // 7) INVITATION_ACCEPTED — projects the recipient owns; someone "accepted" earlier
    const myProjects = projectsByOwner.get(recipient.id) ?? [];
    for (const proj of myProjects.slice(0, 2)) {
      const others = proj.memberUserIds.filter((id) => id !== recipient.id);
      if (others.length === 0) continue;
      const invitee = users.find((u) => u.id === rand(others));
      if (!invitee) continue;
      const role = proj.roles.find((r) => r.name === DefaultRole.MEMBER) ?? proj.roles[0];
      drafts.push({
        type: NotificationType.INVITATION_ACCEPTED,
        isRead: true,
        createdAt: minutesAgo(randInt(60 * 24, 60 * 24 * 8)),
        projectId: proj.id,
        taskId: null,
        payload: {
          project: projectPayload(proj),
          invitee: actorPayload(invitee),
          role: rolePayload(role),
        },
      });
    }

    // 8) INVITATION_DECLINED — symmetric, just declined instead
    for (const proj of myProjects.slice(0, 1)) {
      const others = users.filter((u) => u.id !== recipient.id && !proj.memberUserIds.includes(u.id));
      if (others.length === 0) continue;
      const invitee = rand(others);
      const role = proj.roles.find((r) => r.name === DefaultRole.MEMBER) ?? proj.roles[0];
      drafts.push({
        type: NotificationType.INVITATION_DECLINED,
        isRead: true,
        createdAt: minutesAgo(randInt(60 * 24, 60 * 24 * 10)),
        projectId: proj.id,
        taskId: null,
        payload: {
          project: projectPayload(proj),
          invitee: actorPayload(invitee),
          role: rolePayload(role),
        },
      });
    }

    // Top up with extra TASK_ASSIGNED / TASK_UPDATED references until we hit 20.
    let safety = 0;
    while (drafts.length < 20 && sharedTasks.length > 0 && safety < 200) {
      safety++;
      const t = rand(sharedTasks);
      const proj = projectsById.get(t.projectId);
      if (!proj) continue;
      const otherMembers = proj.memberUserIds.filter((id) => id !== recipient.id);
      const actor =
        otherMembers.length > 0 ? users.find((u) => u.id === rand(otherMembers)) ?? recipient : recipient;
      const type = pickWeighted([
        { value: NotificationType.TASK_UPDATED, weight: 3 },
        { value: NotificationType.TASK_ASSIGNED, weight: 2 },
      ]);
      drafts.push({
        type,
        isRead: Math.random() < 0.7,
        createdAt: minutesAgo(randInt(60, 60 * 24 * 7)),
        projectId: proj.id,
        taskId: t.id,
        payload: {
          task: taskPayload(t),
          project: projectPayload(proj),
          actor: actorPayload(actor),
          ...(type === NotificationType.TASK_UPDATED ? { changes: ["status"] } : {}),
        },
      });
    }

    // Trim down to exactly 20
    drafts.length = Math.min(drafts.length, 20);

    if (drafts.length < 20) {
      console.log(`  ! ${recipient.email}: only produced ${drafts.length} notifications`);
    }

    for (const d of drafts) {
      await pg.notification.create({
        data: {
          recipientId: recipient.id,
          type: d.type,
          isRead: d.isRead,
          payload: d.payload as object,
          projectId: d.projectId,
          taskId: d.taskId,
          createdAt: d.createdAt,
        },
      });
    }
    console.log(`  ✓ ${recipient.email}: ${drafts.length} notifications`);
  }
}

// ---------- main ----------

async function main() {
  console.log("\n=== Planwise demo seed ===\n");

  await wipe();

  const users = await createUsers();
  const usersByEmail = new Map(users.map((u) => [u.email, u]));

  console.log("\n+ Building my-tasks (personal workspaces)…");
  for (const user of users) {
    await seedMyTasks(user);
  }

  console.log("\n+ Building shared projects…");
  const now = new Date();
  const allProjects: SeededProject[] = [];
  for (const owner of users) {
    const projectCount = randInt(4, 6);
    const blueprints = pickN(PROJECT_BLUEPRINTS, projectCount);
    const otherUsers = users.filter((u) => u.id !== owner.id);
    for (const bp of blueprints) {
      // Spread creation between the owner's signup and now, biased toward the
      // recent half so the dashboard growth chart trends upward.
      const bias = Math.pow(Math.random(), 0.55);
      const createdAt = new Date(owner.createdAt.getTime() + bias * (now.getTime() - owner.createdAt.getTime()));
      const project = await seedSharedProject(bp, owner, otherUsers, createdAt);
      allProjects.push(project);
    }
  }

  console.log();
  await seedComments(allProjects);

  console.log();
  await seedAdmins();

  console.log();
  await seedPendingInvitations(users, allProjects);

  console.log();
  await seedNotifications(users, usersByEmail, allProjects);

  // Final stats
  const counts = {
    users: await pg.user.count({ where: { email: { in: SEED_EMAILS } } }),
    projects: allProjects.length,
    tasks: await pg.task.count({
      where: { originalProject: { OR: [{ owner: { email: { in: SEED_EMAILS } } }] } },
    }),
    channels: await pg.channel.count({
      where: { project: { owner: { email: { in: SEED_EMAILS } } } },
    }),
    messages: await mongo.message.count({
      where: { channelId: { in: allProjects.flatMap((p) => p.channelIds) } },
    }),
    notifications: await pg.notification.count({
      where: { recipient: { email: { in: SEED_EMAILS } } },
    }),
    pendingInvitations: await pg.projectInvitation.count({
      where: { invitee: { email: { in: SEED_EMAILS } }, status: "PENDING" },
    }),
    comments: await pg.comment.count({
      where: { author: { email: { in: SEED_EMAILS } } },
    }),
    admins: await pg.admin.count(),
  };

  console.log("\n=== Done ===");
  console.log(`Users:             ${counts.users}`);
  console.log(`Projects (shared): ${counts.projects}`);
  console.log(`Tasks (all):       ${counts.tasks}`);
  console.log(`Comments:          ${counts.comments}`);
  console.log(`Channels:          ${counts.channels}`);
  console.log(`Messages (mongo):  ${counts.messages}`);
  console.log(`Notifications:     ${counts.notifications}`);
  console.log(`Pending invites:   ${counts.pendingInvitations}`);
  console.log(`Admins:            ${counts.admins}`);
  console.log(`\nLogin: any of ${SEED_EMAILS.join(", ")} / password "${PASSWORD}"`);
  console.log(`Admin login (/admin-sign-in): ${SEED_ADMINS.map((a) => a.email).join(", ")} / password "${ADMIN_PASSWORD}"\n`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pg.$disconnect();
    await mongo.$disconnect();
  });
