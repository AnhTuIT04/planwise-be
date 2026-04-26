import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from './section.service';
import { PgService } from '@/modules/database/pg.service';
import { PermissionChecker } from '@/middleware/permission-checker.service';
import { ForbiddenException } from '@nestjs/common';

describe('SectionService', () => {
  let service: SectionService;
  let pgService: any;
  let permissionChecker: any;

  const mockSection = {
    id: 'section_id',
    name: 'Test Section',
    _count: { tasks: 0 },
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: PgService,
          useValue: {
            project: { findFirst: jest.fn() },
            section: { findFirst: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
            taskSection: { findMany: jest.fn() },
            taskProject: { findMany: jest.fn() },
          },
        },
        {
          provide: PermissionChecker,
          useValue: { requirePermission: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
    pgService = module.get<PgService>(PgService);
    permissionChecker = module.get<PermissionChecker>(PermissionChecker);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a section successfully', async () => {
      const userId = 'user_id';
      const dto = { projectId: 'project_id', name: 'New Section' };
      const mockProject = { sections: [] };
      pgService.project.findFirst.mockResolvedValue(mockProject);
      pgService.section.create.mockResolvedValue(mockSection);

      const result = await service.create(userId, dto);

      expect(result.data.id).toBe('section_id');
      expect(pgService.section.create).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if project not found', async () => {
      pgService.project.findFirst.mockResolvedValue(null);
      await expect(service.create('u', { projectId: 'p', name: 'S' })).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should update section successfully', async () => {
      pgService.section.findFirst.mockResolvedValue(mockSection);
      pgService.section.update.mockResolvedValue({ ...mockSection, name: 'Updated Section' });

      const result = await service.update('user_id', 'section_id', { name: 'Updated Section' });

      expect(result.data.name).toBe('Updated Section');
    });
  });

  describe('remove', () => {
    it('should delete section successfully', async () => {
      pgService.section.findUnique.mockResolvedValue(mockSection);
      pgService.section.delete.mockResolvedValue(mockSection);

      const result = await service.remove('user_id', 'section_id');

      expect(result.message).toContain('deleted successfully');
    });
  });

  describe('moveSection', () => {
    it('should move section successfully', async () => {
      pgService.section.findFirst.mockResolvedValue({
        ...mockSection,
        project: { sections: [mockSection] }
      });
      pgService.section.update.mockResolvedValue(mockSection);

      const result = await service.moveSection('user_id', 'section_id', { moveTo: 1 });

      expect(result.message).toContain('moved successfully');
    });
  });
});
