import { Test, TestingModule } from '@nestjs/testing';
import { SubtaskService } from './subtask.service';
import { PgService } from '@/modules/database/pg.service';
import { PermissionChecker } from '@/middleware/permission-checker.service';
import { TaskStatus } from 'prisma/client/pg';

describe('SubtaskService', () => {
  let service: SubtaskService;
  let pgService: any;
  let permissionChecker: any;

  const mockUser = { id: 'user_id', email: 'test@example.com', fullname: 'Test User', avatarUrl: null };
  const mockSubtask = {
    id: 'subtask_id',
    title: 'Subtask 1',
    description: null,
    status: 'TODO',
    priority: 'NORMAL',
    estimate: 600,
    spent: 0,
    lastStarted: null,
    deadline: null,
    supervisor: mockUser,
    assignees: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubtaskService,
        {
          provide: PgService,
          useValue: {
            task: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
            $transaction: jest.fn(),
          },
        },
        {
          provide: PermissionChecker,
          useValue: { requirePermission: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<SubtaskService>(SubtaskService);
    pgService = module.get<PgService>(PgService);
    permissionChecker = module.get<PermissionChecker>(PermissionChecker);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a subtask successfully', async () => {
      const userId = 'user_id';
      const dto = { parentTaskId: 'parent_id', title: 'Subtask', assigneeIds: [] };
      const mockParent = {
        id: 'parent_id',
        projectId: 'project_id',
        originalProjectId: 'project_id',
        priority: 'NORMAL',
        status: TaskStatus.TODO,
        estimate: 1200,
        assignees: []
      };
      
      pgService.task.findFirst.mockResolvedValue(mockParent);
      const mockTx = {
        task: {
          update: jest.fn(),
          create: jest.fn().mockResolvedValue(mockSubtask),
        }
      };
      pgService.$transaction.mockImplementation((cb) => cb(mockTx));

      const result = await service.create(userId, dto as any);

      expect(result.data.id).toBe(mockSubtask.id);
      expect(pgService.$transaction).toHaveBeenCalled();
    });
  });
});
