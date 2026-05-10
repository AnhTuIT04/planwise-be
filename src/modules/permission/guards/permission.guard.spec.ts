import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ModuleRef } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";

import { PermissionGuard } from "./permission.guard";

describe("PermissionGuard", () => {
  let guard: PermissionGuard;
  let reflector: jest.Mocked<Reflector>;
  let moduleRef: jest.Mocked<ModuleRef>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: ModuleRef,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<PermissionGuard>(PermissionGuard);
    reflector = module.get(Reflector);
    moduleRef = module.get(ModuleRef);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  it("should return true if no handler is defined", async () => {
    reflector.getAllAndOverride.mockReturnValue(null);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it("should throw ForbiddenException if handler returns false", async () => {
    const HandlerClass = jest.fn();
    const handlerInstance = { handle: jest.fn().mockResolvedValue(false) };
    reflector.getAllAndOverride.mockReturnValue(HandlerClass);
    moduleRef.create.mockResolvedValue(handlerInstance);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ user: { id: "1" } }),
      }),
    } as any;

    await expect(guard.canActivate(context)).rejects.toThrow(ForbiddenException);
  });

  it("should return true if handler returns true", async () => {
    const HandlerClass = jest.fn();
    const handlerInstance = { handle: jest.fn().mockResolvedValue(true) };
    reflector.getAllAndOverride.mockReturnValue(HandlerClass);
    moduleRef.create.mockResolvedValue(handlerInstance);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ user: { id: "1" } }),
      }),
    } as any;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });
});
