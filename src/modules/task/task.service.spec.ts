import { ForbiddenException, BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TaskService } from "./task.service";
import { PgService } from "~/database/pg.service";
import { NotificationService } from "~/notification/notification.service";

// CRITICAL: Mocking BOTH alias and relative paths for positioning utils
jest.mock("@/common/utils/positioning.utils", () => ({
  midpoint: jest.fn().mockReturnValue("M"),
  idxToString: jest.fn().mockReturnValue("0"),
}));
jest.mock("../../common/utils/positioning.utils", () => ({
  midpoint: jest.fn().mockReturnValue("M"),
  idxToString: jest.fn().mockReturnValue("0"),
}));

jest.mock("./utils/change-status", () => ({
  changeTaskStatus: jest.fn(),
}));

describe("TaskService", () => {
  let service: TaskService;
  let pgService: any;

  const mockTask = {
    id: "task-1",
    title: "Test Task",
    description: "Desc",
    status: "TODO",
    priority: "NORMAL",
    estimate: 3600000,
    spent: 0,
    lastStarted: null,
    deadline: null,
    supervisorId: "user-1",
    originalProjectId: "project-1",
    originalProject: { id: "project-1", name: "Project", isPersonal: false },
    assignees: [{ user: { id: "user-1", fullname: "U", avatarUrl: null } }],
    sections: [{ sectionId: "section-1", position: "A", section: { id: "section-1", projectId: "project-1" } }],
    subtasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    pgService = {
      task: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      section: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
      taskProject: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        deleteMany: jest.fn(),
      },
      taskSection: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      taskAssignee: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
      },
      $transaction: jest.fn((cb) => cb(pgService)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PgService,
          useValue: pgService,
        },
        {
          provide: NotificationService,
          useValue: {
            notifyTaskAssigned: jest.fn().mockResolvedValue(undefined),
            notifyTaskUpdated: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe("create", () => {
    it("should create a task successfully", async () => {
      pgService.section.findFirst.mockResolvedValue({ id: "section-1", projectId: "project-1" });
      pgService.task.findFirst.mockResolvedValue({ sections: [{ position: "A" }] });
      pgService.task.create.mockResolvedValue(mockTask);
      pgService.task.findUnique.mockResolvedValue(mockTask);
      pgService.user.findUnique.mockResolvedValue({ id: "user-1" });

      pgService.section.findFirst.mockResolvedValue({
        id: "section-1",
        projectId: "project-1",
        tasks: [],
      });
      const result = await service.create("user-1", {
        title: "New Task",
        sectionId: "section-1",
        estimate: 3600000,
        assigneeIds: [],
        subtasks: [],
        priority: "NORMAL",
      } as any);
      
      expect(pgService.task.create).toHaveBeenCalled();
      expect(result.data.id).toBe("task-1");
    });
  });

  describe("moveTask", () => {
    it("should move task successfully", async () => {
      pgService.task.findFirst.mockResolvedValue(mockTask);
      pgService.section.findUnique.mockResolvedValue({
        id: "section-2",
        projectId: "project-1",
        tasks: [],
      });
      pgService.taskSection.update.mockResolvedValue({ task: mockTask });

      const result = await service.moveTask("user-1", "task-1", {
        projectId: "project-1",
        sectionId: "section-2"
      } as any);
      
      expect(pgService.taskSection.update).toHaveBeenCalled();
      expect(result.message).toContain("successfully");
    });
  });
});
