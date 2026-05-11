import { ForbiddenException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { SectionService } from "./section.service";
import { PgService } from "~/database/pg.service";

// CRITICAL: Mocking BOTH alias and relative paths for positioning utils
jest.mock("@/common/utils/positioning.utils", () => ({
  midpoint: jest.fn().mockReturnValue("M"),
}));
jest.mock("../../common/utils/positioning.utils", () => ({
  midpoint: jest.fn().mockReturnValue("M"),
}));

describe("SectionService", () => {
  let service: SectionService;
  let pgService: any;

  const mockSection = {
    id: "section-1",
    name: "Test Section",
    projectId: "project-1",
    position: "A",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { tasks: 0 },
  };

  beforeEach(async () => {
    pgService = {
      section: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      project: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
      },
      taskSection: {
        findMany: jest.fn(),
        count: jest.fn(),
      },
      taskProject: {
        findMany: jest.fn(),
      },
      $transaction: jest.fn((cb) => {
        if (typeof cb === "function") return cb(pgService);
        return Promise.all(cb);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: PgService,
          useValue: pgService,
        },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
  });

  describe("create", () => {
    it("should create a section successfully", async () => {
      pgService.project.findFirst.mockResolvedValue({
        id: "project-1",
        sections: [{ id: "s-old", position: "A" }],
      });
      pgService.section.create.mockResolvedValue(mockSection);

      const result = await service.create("user-1", {
        name: "New Section",
        projectId: "project-1",
      });

      expect(pgService.section.create).toHaveBeenCalled();
      expect(result.data.id).toBe("section-1");
    });

    it("should throw ForbiddenException if project not found", async () => {
      pgService.project.findFirst.mockResolvedValue(null);
      await expect(service.create("u", { name: "X", projectId: "P" })).rejects.toThrow(ForbiddenException);
    });
  });

  describe("moveSection", () => {
    it("should move section successfully", async () => {
      pgService.section.findFirst.mockResolvedValue({
        project: {
          sections: [
            { id: "section-1", position: "A" },
            { id: "section-2", position: "B" },
          ],
        },
      });
      pgService.section.update.mockResolvedValue({ ...mockSection, position: "M" });

      const result = await service.moveSection("user-1", "section-1", { moveTo: 1 });
      expect(pgService.section.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { position: "M" } })
      );
      expect(result.message).toContain("successfully");
    });
  });

  describe("getSectionTasks", () => {
    it("should return tasks in section successfully", async () => {
      pgService.section.findFirst.mockResolvedValue(mockSection);
      pgService.taskSection.findMany.mockResolvedValue([]);
      pgService.taskSection.count.mockResolvedValue(0);
      pgService.taskProject.findMany.mockResolvedValue([]);

      const result = await service.getSectionTasks("user-1", "section-1", {
        page: 1,
        limit: 10,
      } as any);

      expect(result.data.tasks.data).toHaveLength(0);
      expect(result.message).toContain("successfully");
    });
  });

  describe("remove", () => {
    it("should delete section successfully", async () => {
      pgService.section.findUnique.mockResolvedValue(mockSection);
      const result = await service.remove("user-1", "section-1");
      expect(pgService.section.delete).toHaveBeenCalled();
      expect(result.message).toContain("successfully");
    });
  });
});
