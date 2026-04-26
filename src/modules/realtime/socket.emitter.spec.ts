import { Test, TestingModule } from '@nestjs/testing';
import { SocketEmitter } from './socket.emitter';

describe('SocketEmitter', () => {
  let service: SocketEmitter;
  let mockServer: any;

  beforeEach(async () => {
    mockServer = {
      emit: jest.fn(),
      to: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      except: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketEmitter],
    }).compile();

    service = module.get<SocketEmitter>(SocketEmitter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error if server not set', () => {
    expect(() => service.emit('event')).toThrow('Socket server not initialized');
  });

  it('should call server.emit when server is set', () => {
    service.setServer(mockServer);
    service.emit('test', { data: 1 });
    expect(mockServer.emit).toHaveBeenCalledWith('test', { data: 1 });
  });

  it('should call server.to when server is set', () => {
    service.setServer(mockServer);
    service.to('room1');
    expect(mockServer.to).toHaveBeenCalledWith('room1');
  });
});
