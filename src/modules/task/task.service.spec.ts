import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PgService } from '@/modules/database/pg.service';
import { PermissionChecker } from '@/middleware/permission-checker.service';
import { NotionService } from '../notion/notion.service';
import { ForbiddenException, BadRequestException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  let pgService: any;
  let permissionChecker: any;
  let notionService: any;

  const mockUser = { id: 'user_id', email: 'test@example.com', fullname: 'Test User', avatarUrl: null };
  const mockProjectBasic = { id: 'project_id', name: 'Project 1', description: null, logoUrl: null, isPersonal: false };
  const mockTask = {
    id: 'task_id',
    title: 'Task 1',
    description: null,
    status: 'TODO',
    priority: 'NORMAL',
    estimate: 1200,
    spent: 0,
    lastStarted: null,
    deadline: null,
    originalProjectId: 'project_id',
    originalProject: mockProjectBasic,
    canImport: true,
    isImported: false,
    supervisor: mockUser,
    assignees: [],
    subtasks: [],
    projects: [{ project: { id: 'project_id', isPersonal: false } }],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PgService,
          useValue: {
            task: {
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            section: { findFirst: jest.fn() },
            taskProject: { findFirst: jest.fn() },
            $transaction: jest.fn(),
          },
        },
        {
          provide: PermissionChecker,
          useValue: { requirePermission: jest.fn() },
        },
        {
          provide: NotionService,
          useValue: {
            syncTaskToNotion: jest.fn(),
            updateNotionPageStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    pgService = module.get<PgService>(PgService);
    permissionChecker = module.get<PermissionChecker>(PermissionChecker);
    notionService = module.get<NotionService>(NotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task successfully', async () => {
      const userId = 'user_id';
      const dto = { title: 'New Task', sectionId: 'section_id', subtasks: [], assigneeIds: [] };
      const mockSection = { id: 'section_id', projectId: 'project_id', tasks: [] };
      pgService.section.findFirst.mockResolvedValue(mockSection);
      pgService.task.create.mockResolvedValue(mockTask);
      pgService.taskProject.findFirst.mockResolvedValue(null);

      const result = await service.create(userId, dto as any);

      expect(result.data.id).toBe(mockTask.id);
      expect(pgService.task.create).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if section not found', async () => {
      pgService.section.findFirst.mockResolvedValue(null);
      await expect(service.create('u', { sectionId: 's' } as any)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getById', () => {
    it('should return a task by id', async () => {
      const userId = 'user_id';
      const taskId = 'task_id';
      pgService.task.findFirst.mockResolvedValue(mockTask);
      pgService.taskProject.findFirst.mockResolvedValue(null);

      const result = await service.getById(userId, taskId);

      expect(result.data.id).toBe(taskId);
    });

    it('should throw ForbiddenException if task not found', async () => {
      pgService.task.findFirst.mockResolvedValue(null);
      await expect(service.getById('u', 't')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should update task successfully', async () => {
      pgService.task.findFirst.mockResolvedValue(mockTask);
      pgService.task.update.mockResolvedValue({ ...mockTask, title: 'Updated' });

      const result = await service.update('user_id', 'task_id', { title: 'Updated' });

      expect(result.data.title).toBe('Updated');
    });
  });

  describe('delete', () => {
    it('should delete task successfully', async () => {
      pgService.task.findUnique.mockResolvedValue(mockTask);
      const mockTx = {
        task: { delete: jest.fn().mockResolvedValue(mockTask) },
        taskSection: { deleteMany: jest.fn() },
        taskProject: { deleteMany: jest.fn() },
      };
      pgService.$transaction.mockImplementation((cb) => cb(mockTx));

      const result = await service.remove('user_id', 'task_id', { projectId: 'project_id' });

      expect(result.message).toContain('deleted successfully');
    });
  });

  describe('updateStatus', () => {
    it('should update task status', async () => {
      pgService.task.findFirst.mockResolvedValue({ ...mockTask, sectionId: 's1' });
      const mockTx = {
        task: { update: jest.fn().mockResolvedValue({ ...mockTask, status: 'DONE' }) },
        taskSection: { 
          updateMany: jest.fn(), 
          findFirst: jest.fn().mockResolvedValue({ position: 'a' }), 
          findMany: jest.fn().mockResolvedValue([{ position: 'a' }]) 
        },
      };
      pgService.$transaction.mockImplementation((cb) => cb(mockTx));

      const result = await service.updateStatus('user_id', 'task_id', { status: 'DONE' as any });

      expect(result.data.status).toBe('DONE');
    });
  });
});
