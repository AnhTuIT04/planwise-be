import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { NotificationType } from "prisma/client/pg";
import { NotificationService } from "./notification.service";
import { PgService } from "~/database/pg.service";
import { SocketEmitter } from "~/realtime/socket.emitter";
import { NotificationCategory } from "./dto/request/get-notifications-query.dto";

describe("NotificationService", () => {
  let service: NotificationService;
  let pgService: any;
  let socketEmitter: any;

  const mockNotification = {
    id: "notif-1",
    recipientId: "user-1",
    type: NotificationType.TASK_ASSIGNED,
    isRead: false,
    payload: {},
    createdAt: new Date(),
  };

  beforeEach(async () => {
    // Chained mock for emitter: emitter.to(id).emit(event, data)
    socketEmitter = {
      to: jest.fn().mockReturnThis(),
      emit: jest.fn().mockReturnThis(),
    };

    pgService = {
      notification: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      $transaction: jest.fn((cb) => {
        if (typeof cb === "function") return cb(pgService);
        return Promise.all(cb);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: PgService,
          useValue: pgService,
        },
        {
          provide: SocketEmitter,
          useValue: socketEmitter,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  describe("list", () => {
    it("should list notifications for a user", async () => {
      pgService.notification.findMany.mockResolvedValue([mockNotification]);
      pgService.notification.count.mockResolvedValue(1);

      const result = await service.list("user-1", {
        page: 1,
        limit: 10,
        category: NotificationCategory.ALL,
      } as any);

      expect(result.data).toHaveLength(1);
      expect(pgService.notification.findMany).toHaveBeenCalled();
    });
  });

  describe("markRead", () => {
    it("should mark a notification as read", async () => {
      pgService.notification.findUnique.mockResolvedValue(mockNotification);
      pgService.notification.update.mockResolvedValue({ ...mockNotification, isRead: true });

      const result = await service.markRead("user-1", "notif-1");
      expect(pgService.notification.update).toHaveBeenCalled();
      expect(result.message).toContain("read");
    });

    it("should throw NotFoundException if not exists", async () => {
      pgService.notification.findUnique.mockResolvedValue(null);
      await expect(service.markRead("u1", "n1")).rejects.toThrow(NotFoundException);
    });
  });

  describe("notifyTaskAssigned", () => {
    it("should create and emit task assigned notification", async () => {
      pgService.notification.create.mockResolvedValue(mockNotification);

      await service.notifyTaskAssigned({
        actorId: "actor-1",
        project: { id: "p1", name: "Project" },
        task: { id: "t1", title: "Task" } as any,
        actor: { id: "actor-1", fullname: "Actor", avatarUrl: null },
        assigneeIds: ["user-1"],
      });

      expect(pgService.notification.create).toHaveBeenCalled();
      expect(socketEmitter.to).toHaveBeenCalledWith("user:user-1");
      expect(socketEmitter.emit).toHaveBeenCalledWith("s2c:notification:new", expect.anything());
    });
  });

  describe("notifyProjectInvitation", () => {
    it("should send project invitation notification", async () => {
      pgService.notification.create.mockResolvedValue({ ...mockNotification, recipientId: "user-2" });

      await service.notifyProjectInvitation({
        inviteeId: "user-2",
        inviter: { id: "user-1", fullname: "Inviter", avatarUrl: null },
        project: { id: "p1", name: "Project" },
        role: { id: "r1", name: "Member" },
      });

      expect(pgService.notification.create).toHaveBeenCalled();
      expect(socketEmitter.to).toHaveBeenCalledWith("user:user-2");
    });
  });

  describe("hasExisting", () => {
    it("should return true if notification exists", async () => {
      pgService.notification.findFirst.mockResolvedValue({ id: "n1" });
      const result = await service.hasExisting("u1", "t1", NotificationType.TASK_DEADLINE_REMINDER);
      expect(result).toBe(true);
    });
  });
});
