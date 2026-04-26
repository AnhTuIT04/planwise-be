import { Test, TestingModule } from '@nestjs/testing';
import { ChannelService } from './channel.service';
import { PgService } from '@/modules/database/pg.service';
import { MongoService } from '@/modules/database/mongo.service';
import { SocketEmitter } from '@/modules/realtime/socket.emitter';
import { NotFoundException } from '@nestjs/common';

describe('ChannelService', () => {
  let service: ChannelService;
  let pgService: any;
  let mongoService: any;
  let emitter: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        {
          provide: PgService,
          useValue: {
            channel: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn(), delete: jest.fn() },
            user: { findMany: jest.fn() },
          },
        },
        {
          provide: MongoService,
          useValue: {
            message: { findMany: jest.fn() },
          },
        },
        {
          provide: SocketEmitter,
          useValue: {
            to: jest.fn().mockReturnThis(),
            emit: jest.fn(),
            in: jest.fn().mockReturnThis(),
            fetchSockets: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    pgService = module.get<PgService>(PgService);
    mongoService = module.get<MongoService>(MongoService);
    emitter = module.get<SocketEmitter>(SocketEmitter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a channel successfully', async () => {
      const userId = 'user_id';
      const dto = { name: 'Chat', type: 'TEXT', projectId: 'project_id' };
      pgService.channel.create.mockResolvedValue({ id: 'c1', ...dto });

      const result = await service.create(userId, dto as any);

      expect(result.data.id).toBe('c1');
      expect(emitter.to).toHaveBeenCalled();
    });
  });

  describe('getAllChannels', () => {
    it('should return all channels for a project', async () => {
      pgService.channel.findMany.mockResolvedValue([{ id: 'c1', name: 'Chat' }]);
      const result = await service.getAllChannels('u', 'p');
      expect(result.data).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update channel name', async () => {
      const channelId = 'c1';
      const dto = { name: 'New Name' };
      pgService.channel.findUnique.mockResolvedValue({ id: channelId, projectId: 'p' });
      pgService.channel.update.mockResolvedValue({ id: channelId, name: 'New Name', projectId: 'p' });

      const result = await service.update('u', channelId, dto);

      expect(result.data.name).toBe('New Name');
    });

    it('should throw NotFoundException if channel not found', async () => {
      pgService.channel.findUnique.mockResolvedValue(null);
      await expect(service.update('u', 'c', { name: 'X' })).rejects.toThrow(NotFoundException);
    });
  });
});
