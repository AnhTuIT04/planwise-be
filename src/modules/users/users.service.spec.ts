import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PgService } from '@/modules/database/pg.service';

describe('UsersService', () => {
  let service: UsersService;
  let pgService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PgService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    pgService = module.get<PgService>(PgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const email = 'test@example.com';
      const user = { id: 'user_id', email };
      pgService.user.findUnique.mockResolvedValue(user);

      const result = await service.findByEmail(email);

      expect(result).toEqual(user);
      expect(pgService.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const id = 'user_id';
      const user = { id, email: 'test@example.com' };
      pgService.user.findUnique.mockResolvedValue(user);

      const result = await service.findById(id);

      expect(result).toEqual(user);
      expect(pgService.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const id = 'user_id';
      const data = { fullname: 'New Name' };
      const updatedUser = { id, email: 'test@example.com', ...data };
      pgService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(id, data);

      expect(result).toEqual(updatedUser);
      expect(pgService.user.update).toHaveBeenCalledWith({ where: { id }, data });
    });
  });

  describe('create', () => {
    it('should create a user in transaction with default project and roles', async () => {
      const userData = { email: 'test@example.com', fullname: 'Test' };
      const mockTx = {
        project: {
          create: jest.fn().mockResolvedValue({
            id: 'project_id',
            owner: { id: 'user_id' },
            roles: [{ id: 'role_id', name: 'Owner' }],
          }),
        },
        user: {
          update: jest.fn().mockResolvedValue({
            id: 'user_id',
            email: 'test@example.com',
            workspaceId: 'project_id',
          }),
        },
      };
      
      pgService.$transaction.mockImplementation(async (cb) => cb(mockTx));

      const result = await service.create(userData as any);

      expect(result.id).toBe('user_id');
      expect(pgService.$transaction).toHaveBeenCalled();
      expect(mockTx.project.create).toHaveBeenCalled();
      expect(mockTx.user.update).toHaveBeenCalled();
    });
  });
});
