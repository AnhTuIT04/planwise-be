import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ProjectService } from "./project.service";
import { PgService } from "~/database/pg.service";
import { EmailService } from "~/email/email.service";
import { NotificationService } from "~/notification/notification.service";

describe("ProjectService", () => {
  let service: ProjectService;
  let pgService: any;
  let emailService: jest.Mocked<EmailService>;
  let notificationService: jest.Mocked<NotificationService>;

  const mockFullProject = {
    id: "project-1",
    name: "Test Project",
    description: "Desc",
    logoUrl: null,
    isPersonal: false,
    owner: { id: "user-1", email: "owner@example.com", fullname: "Owner", avatarUrl: null },
    _count: { members: 1, sections: 1, tasks: 1 },
    createdAt: new Date(),
    roles: [{ id: "role-1", name: "OWNER" }, { id: "role-2", name: "MEMBER" }],
    members: [{ user: { email: "owner@example.com" } }],
  };

  beforeEach(async () => {
    pgService = {
      project: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      section: {
        findMany: jest.fn(),
        count: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
      projectInvitation: {
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
        deleteMany: jest.fn(),
      },
      projectMember: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        updateMany: jest.fn(),
      },
      taskProject: {
        findMany: jest.fn(),
      },
      role: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
      },
      $transaction: jest.fn((cb) => {
        if (typeof cb === "function") return cb(pgService);
        return Promise.all(cb);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: PgService,
          useValue: pgService,
        },
        {
          provide: EmailService,
          useValue: {
            sendProjectInvitationEmail: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            notifyProjectInvitation: jest.fn().mockResolvedValue(undefined),
            notifyInvitationResponse: jest.fn().mockResolvedValue(undefined),
            notifyProjectNewMember: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    emailService = module.get(EmailService);
    notificationService = module.get(NotificationService);
  });

  describe("inviteMember", () => {
    it("should invite a member successfully", async () => {
      pgService.project.findFirst.mockResolvedValue(mockFullProject);
      pgService.user.findUnique.mockResolvedValue({ id: "user-2", email: "new@example.com", fullname: "New" });
      pgService.projectInvitation.create.mockResolvedValue({});

      const result = await service.inviteMember("user-1", "project-1", { email: "new@example.com" });
      expect(pgService.projectInvitation.create).toHaveBeenCalled();
      expect(result.message).toBe("Member invited successfully");
    });

    it("should throw ForbiddenException if user already a member", async () => {
      pgService.project.findFirst.mockResolvedValue(mockFullProject);
      await expect(service.inviteMember("user-1", "project-1", { email: "owner@example.com" })).rejects.toThrow(ForbiddenException);
    });

    it("should throw NotFoundException if user to invite not found", async () => {
      pgService.project.findFirst.mockResolvedValue(mockFullProject);
      pgService.user.findUnique.mockResolvedValue(null);
      await expect(service.inviteMember("user-1", "project-1", { email: "notfound@example.com" })).rejects.toThrow(NotFoundException);
    });
  });

  describe("responseInvitation", () => {
    it("should accept invitation successfully", async () => {
      pgService.projectInvitation.findFirst.mockResolvedValue({ id: "inv-1", roleId: "role-2", inviterId: "user-1" });
      pgService.role.findUnique.mockResolvedValue({ id: "role-2", name: "MEMBER" });
      
      const result = await service.responseInvitation("user-2", "project-1", { response: "ACCEPTED" });
      expect(pgService.projectMember.create).toHaveBeenCalled();
      expect(result.message).toBe("Invitation accepted successfully");
    });

    it("should decline invitation successfully", async () => {
      pgService.projectInvitation.findFirst.mockResolvedValue({ id: "inv-1", roleId: "role-2", inviterId: "user-1" });
      
      const result = await service.responseInvitation("user-2", "project-1", { response: "DECLINED" });
      expect(pgService.projectInvitation.update).toHaveBeenCalledWith(expect.objectContaining({ data: { status: "DECLINED" } }));
      expect(result.message).toBe("Invitation declined successfully");
    });
  });

  describe("removeMember", () => {
    it("should remove a member successfully", async () => {
      pgService.project.findFirst.mockResolvedValue(mockFullProject);
      pgService.projectMember.findFirst.mockResolvedValue({ userId: "user-2", projectId: "project-1" });

      const result = await service.removeMember("user-1", "project-1", "user-2");
      expect(pgService.projectMember.delete).toHaveBeenCalled();
      expect(result.message).toBe("Member removed successfully");
    });
  });

  describe("assignRoleToMember", () => {
    it("should assign role to member successfully", async () => {
      pgService.project.findFirst.mockResolvedValue({ ...mockFullProject, members: [{ userId: "user-2" }] });
      const result = await service.assignRoleToMember("user-1", "project-1", "user-2", { roleId: "role-2" });
      expect(pgService.projectMember.update).toHaveBeenCalled();
      expect(result.message).toContain("successfully");
    });
  });

  describe("update", () => {
    it("should update project details successfully", async () => {
      pgService.project.findFirst.mockResolvedValue(mockFullProject);
      pgService.project.update.mockResolvedValue(mockFullProject);

      const result = await service.update("user-1", "project-1", { name: "New Name" });
      expect(pgService.project.update).toHaveBeenCalled();
      expect(result.data.id).toBe("project-1");
    });
  });

  describe("remove", () => {
    it("should delete project successfully", async () => {
      pgService.project.findFirst.mockResolvedValue({ ...mockFullProject, ownerId: "user-1", _count: { sections: 0, tasks: 0 } });
      pgService.project.delete.mockResolvedValue(mockFullProject);

      const result = await service.remove("user-1", "project-1");
      expect(pgService.project.delete).toHaveBeenCalled();
      expect(result.message).toContain("successfully");
    });

    it("should throw ForbiddenException if it has existing sections or tasks", async () => {
      pgService.project.findFirst.mockResolvedValue({ ...mockFullProject, ownerId: "user-1", _count: { sections: 1, tasks: 0 } });
      await expect(service.remove("user-1", "project-1")).rejects.toThrow(ForbiddenException);
    });
  });
});
