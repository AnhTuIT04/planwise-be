import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { PgService } from '@/modules/database/pg.service';
import { PermissionChecker } from '@/middleware/permission-checker.service';
import { ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Permission } from '@/common/enum/permission.enum';

describe('RoleService', () => {
  let service: RoleService;
  let pgService: any;
  let permissionChecker: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: PgService,
          useValue: {
            project: { findFirst: jest.fn() },
            role: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
            projectMember: { updateMany: jest.fn() },
            projectInvitation: { updateMany: jest.fn() },
            $transaction: jest.fn(),
          },
        },
        {
          provide: PermissionChecker,
          useValue: { requirePermission: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    pgService = module.get<PgService>(PgService);
    permissionChecker = module.get<PermissionChecker>(PermissionChecker);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a role successfully', async () => {
      const userId = 'user_id';
      const dto = { projectId: 'project_id', name: 'New Role', permissions: [Permission.PROJECT_READ] };
      const mockProject = {
        members: [
          {
            userId,
            role: { permissions: JSON.stringify([Permission.PROJECT_MANAGE_ROLES]) },
          },
        ],
      };
      pgService.project.findFirst.mockResolvedValue(mockProject);
      pgService.role.findFirst.mockResolvedValue(null);
      pgService.role.create.mockResolvedValue({ id: 'role_id', ...dto, permissions: JSON.stringify(dto.permissions) });

      const result = await service.create(userId, dto);

      expect(result.data.id).toBe('role_id');
      expect(pgService.role.create).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user has no permission', async () => {
      const userId = 'user_id';
      const dto = { projectId: 'project_id', name: 'New Role' };
      const mockProject = {
        members: [
          {
            userId,
            role: { permissions: JSON.stringify([Permission.PROJECT_READ]) },
          },
        ],
      };
      pgService.project.findFirst.mockResolvedValue(mockProject);

      await expect(service.create(userId, dto)).rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException if role name exists', async () => {
      const userId = 'user_id';
      const dto = { projectId: 'project_id', name: 'Existing Role' };
      const mockProject = {
        members: [
          {
            userId,
            role: { permissions: JSON.stringify([Permission.PROJECT_MANAGE_ROLES]) },
          },
        ],
      };
      pgService.project.findFirst.mockResolvedValue(mockProject);
      pgService.role.findFirst.mockResolvedValue({ id: 'existing_id' });

      await expect(service.create(userId, dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a role successfully', async () => {
      const userId = 'user_id';
      const roleId = 'role_id';
      const dto = { name: 'Updated Name' };
      const mockRole = {
        id: roleId,
        name: 'Old Name',
        permissions: JSON.stringify([Permission.PROJECT_READ]),
        projectId: 'project_id',
        project: {
          members: [{ userId, role: { permissions: JSON.stringify([Permission.PROJECT_MANAGE_ROLES]) } }]
        }
      };
      
      pgService.role.findFirst
        .mockResolvedValueOnce(mockRole)
        .mockResolvedValueOnce(null);
        
      permissionChecker.requirePermission.mockResolvedValue(undefined);
      pgService.role.update.mockResolvedValue({ ...mockRole, ...dto });

      const result = await service.update(userId, roleId, dto);

      expect(result.data.id).toBe(roleId);
      expect(pgService.role.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if role not found', async () => {
      pgService.role.findFirst.mockResolvedValue(null);
      await expect(service.update('u', 'r', {})).rejects.toThrow(NotFoundException);
    });
  });
});
