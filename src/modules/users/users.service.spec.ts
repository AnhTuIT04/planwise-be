import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PgService } from "~/database/pg.service";

describe("UsersService", () => {
  let service: UsersService;
  let pgService: any;

  beforeEach(async () => {
    pgService = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
      },
      project: {
        create: jest.fn(),
      },
      $transaction: jest.fn((cb) => cb(pgService)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PgService,
          useValue: pgService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a user and a workspace in a transaction", async () => {
      const userData = { email: "test@example.com", fullname: "Test User" };
      const project = {
        id: "project-1",
        owner: { id: "user-1" },
        roles: [{ id: "role-1", name: "OWNER" }],
      };

      pgService.project.create.mockResolvedValue(project);
      pgService.user.update.mockResolvedValue({ id: "user-1", ...userData, workspaceId: "project-1" });

      const result = await service.create(userData as any);

      expect(pgService.$transaction).toHaveBeenCalled();
      expect(pgService.project.create).toHaveBeenCalled();
      expect(result.workspaceId).toBe("project-1");
    });
  });

  describe("findByEmail", () => {
    it("should find user by email", async () => {
      const email = "test@example.com";
      pgService.user.findUnique.mockResolvedValue({ id: "1", email });

      const result = await service.findByEmail(email);
      expect(result.email).toBe(email);
    });
  });

  describe("update", () => {
    it("should update user data", async () => {
      const id = "1";
      const updateData = { fullname: "Updated Name" };
      pgService.user.update.mockResolvedValue({ id, ...updateData });

      const result = await service.update(id, updateData);
      expect(result.fullname).toBe("Updated Name");
    });
  });
});
