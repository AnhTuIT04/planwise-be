import { hash } from "bcrypt";
import { NotificationType, PrismaClient, PriorityLevel, TaskStatus } from "prisma/client/pg";

import { DefaultRole } from "@/common/enum/default-role.enum";
import { DEFAULT_ROLE_PERMISSIONS } from "@/common/enum/permission.enum";
import { midpoint } from "@/common/utils/positioning.utils";

const prisma = new PrismaClient();

const SEED_TAG = "[noti-seed]";
const PASSWORD = "Password1!";

interface SeededUser {
  id: string;
  email: string;
  fullname: string;
  avatarUrl: string | null;
  workspaceId: string;
}

interface SeededProject {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  ownerId: string;
  defaultRoleId: string;
  ownerRoleId: string;
  defaultRoleName: string;
  sectionId: string;
}

async function ensureUser(email: string, fullname: string): Promise<SeededUser> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`✓ Using existing user ${email}`);
    return {
      id: existing.id,
      email: existing.email,
      fullname: existing.fullname,
      avatarUrl: existing.avatarUrl,
      workspaceId: existing.workspaceId,
    };
  }

  console.log(`+ Creating user ${email}`);
  const hashed = await hash(PASSWORD, 10);

  const created = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: "My Workspace",
        isPersonal: true,
        owner: {
          create: { email, password: hashed, fullname, verified: true, workspaceId: "" },
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
  });

  return {
    id: created.id,
    email: created.email,
    fullname: created.fullname,
    avatarUrl: created.avatarUrl,
    workspaceId: created.workspaceId,
  };
}

async function ensureSharedProject(
  name: string,
  owner: SeededUser,
  members: SeededUser[],
): Promise<SeededProject> {
  const existing = await prisma.project.findFirst({
    where: { name, isPersonal: false, ownerId: owner.id },
    include: {
      sections: { orderBy: { position: "asc" }, take: 1 },
      roles: true,
    },
  });

  if (existing && existing.sections.length > 0) {
    console.log(`✓ Using existing project "${name}"`);
    const ownerRole = existing.roles.find((r) => r.name === (DefaultRole.OWNER as string))!;
    const memberRole = existing.roles.find((r) => r.name === (DefaultRole.MEMBER as string))!;
    for (const member of members) {
      await prisma.projectMember.upsert({
        where: { userId_projectId: { userId: member.id, projectId: existing.id } },
        update: {},
        create: { projectId: existing.id, userId: member.id, roleId: memberRole.id },
      });
    }
    return {
      id: existing.id,
      name: existing.name,
      description: existing.description,
      logoUrl: existing.logoUrl,
      ownerId: existing.ownerId,
      defaultRoleId: memberRole.id,
      ownerRoleId: ownerRole.id,
      defaultRoleName: memberRole.name,
      sectionId: existing.sections[0].id,
    };
  }

  console.log(`+ Creating project "${name}"`);
  const created = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name,
        description: `${SEED_TAG} demo project`,
        isPersonal: false,
        ownerId: owner.id,
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
    const memberRole = project.roles.find((r) => r.name === (DefaultRole.MEMBER as string))!;

    await tx.projectMember.create({
      data: { projectId: project.id, userId: owner.id, roleId: ownerRole.id },
    });
    for (const member of members) {
      await tx.projectMember.create({
        data: { projectId: project.id, userId: member.id, roleId: memberRole.id },
      });
    }

    return { project, ownerRole, memberRole };
  });

  return {
    id: created.project.id,
    name: created.project.name,
    description: created.project.description,
    logoUrl: created.project.logoUrl,
    ownerId: created.project.ownerId,
    defaultRoleId: created.memberRole.id,
    ownerRoleId: created.ownerRole.id,
    defaultRoleName: created.memberRole.name,
    sectionId: created.project.sections[0].id,
  };
}

async function ensureTask(
  project: SeededProject,
  title: string,
  assignee: SeededUser,
  options: { status?: TaskStatus; priority?: PriorityLevel; deadline?: Date | null } = {},
) {
  const fullTitle = `${SEED_TAG} ${title}`;
  const existing = await prisma.task.findFirst({
    where: { title: fullTitle, originalProjectId: project.id },
  });
  if (existing) return existing;

  return prisma.task.create({
    data: {
      title: fullTitle,
      description: null,
      status: options.status ?? TaskStatus.TODO,
      priority: options.priority ?? PriorityLevel.NORMAL,
      estimate: 60 * 60 * 1000,
      spent: 0,
      deadline: options.deadline ?? null,
      originalProjectId: project.id,
      assignees: { create: [{ userId: assignee.id }] },
      projects: { create: [{ projectId: project.id }] },
      sections: { create: [{ sectionId: project.sectionId, position: midpoint(null, null) }] },
    },
  });
}

async function ensurePendingInvitation(project: SeededProject, inviter: SeededUser, invitee: SeededUser) {
  const existing = await prisma.projectInvitation.findUnique({
    where: { inviteeId_projectId: { inviteeId: invitee.id, projectId: project.id } },
  });
  if (existing) {
    if (existing.status !== "PENDING") {
      await prisma.projectInvitation.update({
        where: { inviteeId_projectId: { inviteeId: invitee.id, projectId: project.id } },
        data: { status: "PENDING", roleId: project.defaultRoleId, inviterId: inviter.id },
      });
      console.log(`✓ Reset invitation for ${invitee.email} to ${project.name} back to PENDING`);
    } else {
      console.log(`✓ Pending invitation already exists for ${invitee.email} on ${project.name}`);
    }
    return;
  }

  await prisma.projectInvitation.create({
    data: {
      inviteeId: invitee.id,
      inviterId: inviter.id,
      projectId: project.id,
      roleId: project.defaultRoleId,
    },
  });
  console.log(`+ Created PENDING invitation for ${invitee.email} on ${project.name}`);
}

function actorPayload(u: SeededUser) {
  return { id: u.id, fullname: u.fullname, avatarUrl: u.avatarUrl };
}

function projectPayload(p: SeededProject) {
  return { id: p.id, name: p.name, description: p.description, logoUrl: p.logoUrl };
}

function taskPayload(task: { id: string; title: string; status: TaskStatus; priority: PriorityLevel; deadline: Date | null }, sectionId: string) {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
    sectionId,
  };
}

function rolePayload(p: SeededProject) {
  return { id: p.defaultRoleId, name: p.defaultRoleName };
}

function minutesAgo(n: number): Date {
  return new Date(Date.now() - n * 60 * 1000);
}

interface NotificationDraft {
  type: NotificationType;
  payload: any;
  isRead: boolean;
  createdAt: Date;
  projectId: string | null;
  taskId: string | null;
}

async function clearSeededNotifications(recipientId: string) {
  const result = await prisma.notification.deleteMany({
    where: {
      recipientId,
      OR: [
        { payload: { path: ["seed"], equals: SEED_TAG } },
        { task: { title: { startsWith: SEED_TAG } } },
      ],
    },
  });
  console.log(`× Removed ${result.count} previously seeded notifications`);
}

async function main() {
  const args = process.argv.slice(2);
  const reset = args.includes("--reset");

  const recipient = await ensureUser("noti.user@planwise.test", "Noti User");
  const peer = await ensureUser("noti.peer@planwise.test", "Noti Peer");
  const newcomer = await ensureUser("noti.newbie@planwise.test", "Noti Newbie");

  const sharedProject = await ensureSharedProject("Notification Demo", recipient, [peer]);
  const peerProject = await ensureSharedProject("Acme Roadmap", peer, []);

  // Pending invitation that the FE Accept/Decline buttons can act on
  await ensurePendingInvitation(peerProject, peer, recipient);

  // A real task we can deep-link to
  const sharedTask = await ensureTask(sharedProject, "Polish notification bell", recipient, {
    status: TaskStatus.TODO,
    priority: PriorityLevel.HIGH,
    deadline: new Date(Date.now() + 6 * 60 * 60 * 1000),
  });

  if (reset) {
    await clearSeededNotifications(recipient.id);
  }

  const sharedTaskBasic = taskPayload(sharedTask, sharedProject.sectionId);

  const drafts: NotificationDraft[] = [
    {
      type: NotificationType.PROJECT_INVITATION,
      isRead: false,
      createdAt: minutesAgo(2),
      projectId: peerProject.id,
      taskId: null,
      payload: {
        seed: SEED_TAG,
        project: projectPayload(peerProject),
        role: rolePayload(peerProject),
        inviter: actorPayload(peer),
      },
    },
    {
      type: NotificationType.TASK_ASSIGNED,
      isRead: false,
      createdAt: minutesAgo(15),
      projectId: sharedProject.id,
      taskId: sharedTask.id,
      payload: {
        seed: SEED_TAG,
        task: sharedTaskBasic,
        project: projectPayload(sharedProject),
        actor: actorPayload(peer),
      },
    },
    {
      type: NotificationType.TASK_UPDATED,
      isRead: false,
      createdAt: minutesAgo(45),
      projectId: sharedProject.id,
      taskId: sharedTask.id,
      payload: {
        seed: SEED_TAG,
        task: sharedTaskBasic,
        project: projectPayload(sharedProject),
        actor: actorPayload(peer),
        changes: ["status"],
      },
    },
    {
      type: NotificationType.TASK_DEADLINE_REMINDER,
      isRead: false,
      createdAt: minutesAgo(90),
      projectId: sharedProject.id,
      taskId: sharedTask.id,
      payload: {
        seed: SEED_TAG,
        task: sharedTaskBasic,
        project: projectPayload(sharedProject),
      },
    },
    {
      type: NotificationType.TASK_DEADLINE_MISSED,
      isRead: false,
      createdAt: minutesAgo(60 * 5),
      projectId: sharedProject.id,
      taskId: sharedTask.id,
      payload: {
        seed: SEED_TAG,
        task: { ...sharedTaskBasic, deadline: minutesAgo(60 * 4) },
        project: projectPayload(sharedProject),
      },
    },
    {
      type: NotificationType.PROJECT_NEW_MEMBER,
      isRead: false,
      createdAt: minutesAgo(60 * 8),
      projectId: sharedProject.id,
      taskId: null,
      payload: {
        seed: SEED_TAG,
        project: projectPayload(sharedProject),
        newMember: actorPayload(newcomer),
        role: rolePayload(sharedProject),
      },
    },
    {
      type: NotificationType.INVITATION_ACCEPTED,
      isRead: true,
      createdAt: minutesAgo(60 * 24),
      projectId: sharedProject.id,
      taskId: null,
      payload: {
        seed: SEED_TAG,
        project: projectPayload(sharedProject),
        invitee: actorPayload(newcomer),
        role: rolePayload(sharedProject),
      },
    },
    {
      type: NotificationType.INVITATION_DECLINED,
      isRead: true,
      createdAt: minutesAgo(60 * 30),
      projectId: sharedProject.id,
      taskId: null,
      payload: {
        seed: SEED_TAG,
        project: projectPayload(sharedProject),
        invitee: actorPayload(newcomer),
        role: rolePayload(sharedProject),
      },
    },
    {
      type: NotificationType.TASK_UPDATED,
      isRead: true,
      createdAt: minutesAgo(60 * 36),
      projectId: sharedProject.id,
      taskId: sharedTask.id,
      payload: {
        seed: SEED_TAG,
        task: sharedTaskBasic,
        project: projectPayload(sharedProject),
        actor: actorPayload(peer),
        changes: ["priority", "deadline"],
      },
    },
    {
      type: NotificationType.TASK_ASSIGNED,
      isRead: true,
      createdAt: minutesAgo(60 * 50),
      projectId: sharedProject.id,
      taskId: sharedTask.id,
      payload: {
        seed: SEED_TAG,
        task: sharedTaskBasic,
        project: projectPayload(sharedProject),
        actor: actorPayload(newcomer),
      },
    },
  ];

  for (const draft of drafts) {
    await prisma.notification.create({
      data: {
        recipientId: recipient.id,
        type: draft.type,
        isRead: draft.isRead,
        payload: draft.payload,
        projectId: draft.projectId,
        taskId: draft.taskId,
        createdAt: draft.createdAt,
      },
    });
  }

  console.log(`\n=== Done ===`);
  console.log(`Recipient login: ${recipient.email} / ${PASSWORD}`);
  console.log(`Peer login:      ${peer.email} / ${PASSWORD}`);
  console.log(`Newcomer login:  ${newcomer.email} / ${PASSWORD}`);
  console.log(`Notifications:   ${drafts.length} (mix of read/unread, all 8 types)`);
  console.log(`Pending invite:  ${peer.email} -> ${recipient.email} on "${peerProject.name}"`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
