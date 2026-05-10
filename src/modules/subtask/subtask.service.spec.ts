import { Test, TestingModule } from "@nestjs/testing";
import { SubtaskService } from "./subtask.service";
import { PgService } from "~/database/pg.service";

// CRITICAL: Mocking BOTH alias and relative paths for positioning utils
jest.mock("@/common/utils/positioning.utils", () => ({
  midpoint: jest.fn().mockReturnValue("M"),
}));
jest.mock("../../common/utils/positioning.utils", () => ({
  midpoint: jest.fn().mockReturnValue("M"),
}));

jest.mock("./utils/change-status", () => ({
  changeSubtaskStatus: jest.fn(),
}));

describe("SubtaskService", () => {
  let service: SubtaskService;
  let pgService: any;

  const mockParentTask = {
    id: "parent-1",
    title: "Parent Task",
    status: "TODO",
    estimate: 5000,
    spent: 0,
    lastStarted: null,
    assignees: [{ user: { id: "user-1", fullname: "U", avatarUrl: null } }],
    subtasks: [],
    originalProject: { id: "proj-1", isPersonal: false },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSubtask = {
    id: "sub-1",
    title: "Subtask",
    status: "TODO",
    estimate: 1000,
    spent: 0,
    lastStarted: null,
    position: "M",
    parentTask: mockParentTask,
    assignees: [{ user: { id: "user-1", fullname: "U", avatarUrl: null } }],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    pgService = {
      task: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      subtask: {
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      taskProject: {
        findFirst: jest.fn(),
      },
      $transaction: jest.fn((cb) => cb(pgService)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubtaskService,
        {
          provide: PgService,
          useValue: pgService,
        },
      ],
    }).compile();

    service = module.get<SubtaskService>(SubtaskService);
  });

  describe("create", () => {
    it("should create a subtask successfully", async () => {
      pgService.task.findFirst.mockResolvedValue(mockParentTask);
      pgService.task.update.mockResolvedValue(mockParentTask);
      
      const result = await service.create("user-1", {
        parentTaskId: "parent-1",
        title: "New Subtask",
        assigneeIds: ["user-2"]
      });

      expect(pgService.subtask.create).toHaveBeenCalled();
      expect(result.data.id).toBe("parent-1");
    });
  });

  describe("update", () => {
    it("should update subtask successfully", async () => {
      pgService.subtask.findFirst.mockResolvedValue(mockSubtask);
      pgService.subtask.update.mockResolvedValue({ ...mockSubtask, title: "New Title" });

      const result = await service.update("user-1", "sub-1", { title: "New Title" });
      expect(pgService.subtask.update).toHaveBeenCalled();
      expect(result.data.id).toBe("parent-1");
    });
  });

  describe("moveSubtask", () => {
    it("should move subtask successfully", async () => {
      pgService.subtask.findFirst.mockResolvedValue({
        ...mockSubtask,
        parentTask: { subtasks: [{ id: "sub-1", position: "A" }, { id: "sub-2", position: "B" }] }
      });
      pgService.subtask.update.mockResolvedValue(mockSubtask);

      const result = await service.moveSubtask("user-1", "sub-1", { moveTo: 1 });
      expect(pgService.subtask.update).toHaveBeenCalled();
      expect(result.data.id).toBe("parent-1");
    });
  });

  describe("updateAssignees", () => {
    it("should update subtask assignees successfully", async () => {
      pgService.subtask.findFirst.mockResolvedValue(mockSubtask);
      pgService.subtask.update.mockResolvedValue(mockSubtask);

      const result = await service.updateAssignees("user-1", "sub-1", { assigneeIds: ["user-2"] });
      expect(pgService.subtask.update).toHaveBeenCalled();
      expect(result.data.id).toBe("parent-1");
    });
  });

  describe("remove", () => {
    it("should remove subtask successfully", async () => {
      pgService.subtask.findFirst.mockResolvedValue(mockSubtask);
      pgService.task.update.mockResolvedValue(mockParentTask);

      const result = await service.remove("user-1", "sub-1");
      expect(pgService.subtask.delete).toHaveBeenCalled();
      expect(result.data.id).toBe("parent-1");
    });
  });
});
