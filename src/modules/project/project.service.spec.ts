import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PgService } from '@/modules/database/pg.service';
import { EmailService } from '@/modules/email/email.service';
import { PermissionChecker } from '@/middleware/permission-checker.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('ProjectService', () => {
  let service: ProjectService;
  let pgService: any;
  let emailService: any;
  let permissionChecker: any;

  const mockUser = {
    id: 'user_id',
    email: 'test@example.com',
    fullname: 'Test User',
    avatarUrl: null,
  };

  const mockProject = {
    id: 'project_id',
    name: 'Test Project',
    description: null,
    logoUrl: null,
    isPersonal: false,
    owner: mockUser,
    _count: {
      members: 1,
      sections: 0,
      tasks: 0,
    },
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: PgService,
          useValue: {
            project: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            section: { findMany: jest.fn() },
            user: { findUnique: jest.fn() },
            projectInvitation: { create: jest.fn() },
            $transaction: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: { sendProjectInvitationEmail: jest.fn().mockResolvedValue(undefined) },
        },
        {
          provide: PermissionChecker,
          useValue: { requirePermission: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    pgService = module.get<PgService>(PgService);
    emailService = module.get<EmailService>(EmailService);
    permissionChecker = module.get<PermissionChecker>(PermissionChecker);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProjects', () => {
    it('should return projects for a user', async () => {
      const userId = 'user_id';
      pgService.project.findMany.mockResolvedValue([mockProject]);

      const result = await service.getAllProjects(userId);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(mockProject.id);
    });
  });

  describe('getDetailedProject', () => {
    it('should return a detailed project', async () => {
      const userId = 'user_id';
      const projectId = 'project_id';
      pgService.project.findFirst.mockResolvedValue(mockProject);

      const result = await service.getDetailedProject(userId, projectId);

      expect(result.data.id).toBe(projectId);
    });

    it('should throw NotFoundException if project not found', async () => {
      pgService.project.findFirst.mockResolvedValue(null);
      await expect(service.getDetailedProject('u', 'p')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a project successfully', async () => {
      const userId = 'user_id';
      const dto = { name: 'New Project' };
      const mockTx = {
        project: {
          create: jest.fn().mockResolvedValue({
            id: 'project_id',
            roles: [{ id: 'admin_role', name: 'Admin' }],
          }),
          update: jest.fn().mockResolvedValue(mockProject),
        },
      };
      pgService.$transaction.mockImplementation((cb) => cb(mockTx));

      const result = await service.create(userId, dto);

      expect(result.data.id).toBe('project_id');
      expect(pgService.$transaction).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update project successfully', async () => {
      const userId = 'user_id';
      const projectId = 'project_id';
      const dto = { name: 'Updated Name' };
      pgService.project.findFirst.mockResolvedValue(mockProject);
      pgService.project.update.mockResolvedValue({ ...mockProject, name: 'Updated Name' });

      const result = await service.update(userId, projectId, dto);

      expect(result.data.name).toBe('Updated Name');
    });

    it('should throw ForbiddenException for personal project', async () => {
      pgService.project.findFirst.mockResolvedValue({ ...mockProject, isPersonal: true });
      await expect(service.update('u', 'p', { name: 'X' })).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('should delete project successfully', async () => {
      pgService.project.findFirst.mockResolvedValue(mockProject);
      pgService.project.delete.mockResolvedValue(mockProject);

      const result = await service.remove('user_id', 'project_id');

      expect(result.message).toContain('deleted successfully');
      expect(pgService.project.delete).toHaveBeenCalled();
    });

    it('should throw ForbiddenException for personal project deletion', async () => {
      pgService.project.findFirst.mockResolvedValue({ ...mockProject, isPersonal: true });
      await expect(service.remove('u', 'p')).rejects.toThrow(ForbiddenException);
    });
  });
  describe('inviteMember', () => {
    it('should invite member successfully', async () => {
      pgService.project.findFirst.mockResolvedValue({
        ...mockProject,
        members: [],
        roles: [{ id: 'role_id', name: 'Member' }]
      });
      pgService.user.findUnique.mockResolvedValue({ id: 'new_user_id', email: 'new@example.com' });
      const result = await service.inviteMember('user_id', 'project_id', { email: 'new@example.com', roleId: 'role_id' });

      expect(result.message).toContain('Member invited successfully');
      expect(emailService.sendProjectInvitationEmail).toHaveBeenCalled();
    });
  });
});
