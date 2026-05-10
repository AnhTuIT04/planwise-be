import { Test, TestingModule } from "@nestjs/testing";
import { ReviewService } from "./review.service";
import { PgService } from "~/database/pg.service";
import { TaskStatus } from "prisma/client/pg";

describe("ReviewService", () => {
  let service: ReviewService;
  let pgService: any;

  beforeEach(async () => {
    pgService = {
      task: {
        findMany: jest.fn(),
        aggregate: jest.fn(),
        count: jest.fn(),
      },
      project: {
        findMany: jest.fn(),
      },
      $transaction: jest.fn((promises) => Promise.all(promises)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: PgService,
          useValue: pgService,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  describe("getMyReview", () => {
    it("should calculate review KPIs correctly", async () => {
      const now = new Date();
      const mockTasks = [
        {
          id: "t1",
          status: TaskStatus.DONE,
          priority: "HIGH",
          estimate: 3600000,
          spent: 3600000,
          deadline: now,
          updatedAt: now,
          projects: [{ projectId: "p1" }],
        },
      ];

      pgService.task.findMany.mockResolvedValue(mockTasks);
      pgService.task.aggregate.mockResolvedValue({ _sum: { spent: 3600000 } });
      pgService.task.count.mockResolvedValue(0);
      pgService.project.findMany.mockResolvedValue([{ id: "p1", name: "Project 1", logoUrl: null }]);

      const result = await service.getMyReview("user-1", { period: "LAST_7_DAYS" } as any);

      expect(result.data.kpis.completed).toBe(1);
      expect(result.data.projects).toHaveLength(1);
      expect(result.data.projects[0].name).toBe("Project 1");
    });

    it("should handle empty tasks", async () => {
      pgService.task.findMany.mockResolvedValue([]);
      pgService.task.aggregate.mockResolvedValue({ _sum: { spent: 0 } });
      pgService.task.count.mockResolvedValue(0);
      pgService.project.findMany.mockResolvedValue([]);

      const result = await service.getMyReview("user-1", { period: "THIS_WEEK" } as any);
      expect(result.data.kpis.completed).toBe(0);
      expect(result.data.projects).toHaveLength(0);
    });
  });
});
