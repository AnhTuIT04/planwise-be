import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RoleService } from "./role.service";
import { PgService } from "~/database/pg.service";
import { EPermission } from "@/common/enum/permission.enum";

describe("RoleService", () => {
  let service: RoleService;
  let pgService: any;

  beforeEach(async () => {
    pgService = {
      project: {
        findFirst: jest.fn(),
      },
      role: {
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      projectMember: {
        findFirst: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      projectInvitation: {
        updateMany: jest.fn(),
      },
      $transaction: jest.fn((cb) => cb(pgService)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: PgService,
          useValue: pgService,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  describe("create", () => {
    it("should create a role successfully", async () => {
      pgService.project.findFirst.mockResolvedValue({ roles: [] });
      pgService.role.create.mockResolvedValue({ id: "r-1", name: "Custom", permissions: "[]" });

      const result = await service.create("u-1", { projectId: "p-1", name: "Custom", permissions: [EPermission.PROJECT_CREATE_DATA] });
      expect(pgService.role.create).toHaveBeenCalled();
      expect(result.data.name).toBe("Custom");
    });

    it("should throw ConflictException if role name exists", async () => {
      pgService.project.findFirst.mockResolvedValue({ roles: [{ name: "Admin" }] });
      await expect(service.create("u-1", { projectId: "p-1", name: "Admin" })).rejects.toThrow(ConflictException);
    });

    it("should throw BadRequestException for invalid permissions", async () => {
      pgService.project.findFirst.mockResolvedValue({ roles: [] });
      await expect(service.create("u-1", { projectId: "p-1", name: "New", permissions: ["INVALID" as any] })).rejects.toThrow(BadRequestException);
    });
  });

  describe("remove", () => {
    it("should remove role and reassign members", async () => {
      pgService.role.findFirst.mockResolvedValueOnce({ id: "r-1", default: false, projectId: "p-1" });
      pgService.role.findFirst.mockResolvedValueOnce({ id: "r-default", name: "MEMBER" });

      const result = await service.remove("u-1", "r-1");
      expect(pgService.role.delete).toHaveBeenCalled();
      expect(result.message).toContain("Role deleted successfully");
    });

    it("should throw BadRequestException when deleting default role", async () => {
      pgService.role.findFirst.mockResolvedValue({ id: "r-1", default: true });
      await expect(service.remove("u-1", "r-1")).rejects.toThrow(BadRequestException);
    });
  });

  describe("update", () => {
    it("should update role name and permissions", async () => {
      pgService.role.findFirst.mockResolvedValue({ id: "r-1", name: "Old Name", default: false });
      pgService.role.update.mockResolvedValue({ id: "r-1", name: "New Name", permissions: "[]" });

      const result = await service.update("u-1", "r-1", { name: "New Name", permissions: [EPermission.PROJECT_UPDATE] });
      expect(pgService.role.update).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ name: "New Name" })
      }));
      expect(result.data.name).toBe("New Name");
    });

    it("should throw BadRequestException if updating default role", async () => {
      pgService.role.findFirst.mockResolvedValue({ id: "r-1", default: true });
      await expect(service.update("u-1", "r-1", { name: "Fail" })).rejects.toThrow(BadRequestException);
    });
  });

  describe("changeUserRole", () => {
    it("should change member role successfully", async () => {
      pgService.role.findFirst.mockResolvedValue({ id: "r-new", projectId: "p-1" });
      pgService.projectMember.findFirst.mockResolvedValue({ userId: "u-target", projectId: "p-1" });

      const result = await service.changeUserRole("u-admin", "r-new", { userId: "u-target" });
      expect(pgService.projectMember.update).toHaveBeenCalled();
      expect(result.message).toContain("successfully");
    });

    it("should throw NotFoundException if user is not a member", async () => {
      pgService.role.findFirst.mockResolvedValue({ id: "r-new", projectId: "p-1" });
      pgService.projectMember.findFirst.mockResolvedValue(null);

      await expect(service.changeUserRole("u-admin", "r-new", { userId: "u-target" })).rejects.toThrow(NotFoundException);
    });
  });
});
