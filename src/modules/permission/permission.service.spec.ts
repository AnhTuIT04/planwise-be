import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { PgService } from '@/modules/database/pg.service';
import { Permission } from '@/common/enum/permission.enum';

describe('PermissionService', () => {
  let service: PermissionService;
  let pgService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: PgService,
          useValue: {
            projectMember: {
              findUnique: jest.fn(),
            },
            role: {
              findFirst: jest.fn(),
              update: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    pgService = module.get<PgService>(PgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserPermissions', () => {
    it('should return parsed permissions for a project member', async () => {
      const userId = 'user_id';
      const projectId = 'project_id';
      const mockMember = {
        role: {
          permissions: JSON.stringify([Permission.PROJECT_READ]),
        },
      };
      pgService.projectMember.findUnique.mockResolvedValue(mockMember);

      const result = await service.getUserPermissions(userId, projectId);

      expect(result).toEqual([Permission.PROJECT_READ]);
    });

    it('should return empty array if member not found', async () => {
      pgService.projectMember.findUnique.mockResolvedValue(null);
      const result = await service.getUserPermissions('u', 'p');
      expect(result).toEqual([]);
    });
  });

  describe('userHasPermission', () => {
    it('should return true if user has the specific permission', async () => {
      const userId = 'user_id';
      const projectId = 'project_id';
      const mockMember = {
        role: {
          permissions: JSON.stringify([Permission.PROJECT_READ]),
        },
      };
      pgService.projectMember.findUnique.mockResolvedValue(mockMember);

      const result = await service.userHasPermission(userId, projectId, Permission.PROJECT_READ);

      expect(result).toBe(true);
    });

    it('should return false if user does not have the specific permission', async () => {
      const userId = 'user_id';
      const projectId = 'project_id';
      const mockMember = {
        role: {
          permissions: JSON.stringify([Permission.PROJECT_READ]),
        },
      };
      pgService.projectMember.findUnique.mockResolvedValue(mockMember);

      const result = await service.userHasPermission(userId, projectId, Permission.PROJECT_UPDATE);

      expect(result).toBe(false);
    });
  });

  describe('initializeDefaultRoles', () => {
    it('should create or update default roles', async () => {
      const projectId = 'project_id';
      pgService.role.findFirst.mockResolvedValue(null);
      pgService.role.create.mockResolvedValue({ id: 'role_id' });

      await service.initializeDefaultRoles(projectId);

      expect(pgService.role.create).toHaveBeenCalled();
    });
  });
});
