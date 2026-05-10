import { BadRequestException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

import { AuthService } from "./auth.service";
import { UsersService } from "~/users/users.service";
import { CacheService } from "~/cache/cache.service";
import { EmailService } from "~/email/email.service";

jest.mock("bcrypt");

describe("AuthService", () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let cacheService: jest.Mocked<CacheService>;
  let jwtService: jest.Mocked<JwtService>;
  let emailService: jest.Mocked<EmailService>;

  const mockUser = {
    id: "user-1",
    email: "test@example.com",
    fullname: "Test User",
    avatarUrl: null,
    password: "hashed_password",
    verified: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            updatePassword: jest.fn(),
          },
        },
        {
          provide: CacheService,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
            clear: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue("mock_token"),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendOtpEmail: jest.fn().mockResolvedValue(undefined),
            sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
            sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    cacheService = module.get(CacheService);
    jwtService = module.get(JwtService);
    emailService = module.get(EmailService);
  });

  describe("signin", () => {
    it("should sign in successfully", async () => {
      usersService.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.signin({ email: "test@example.com", password: "password" });
      expect(result.accessToken).toBe("mock_token");
      expect(result.user.email).toBe(mockUser.email);
    });

    it("should throw UnauthorizedException for invalid credentials", async () => {
      usersService.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signin({ email: "test@example.com", password: "wrong" })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("signup", () => {
    it("should signup successfully", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue({ id: "u-1", email: "new@test.com", verified: false } as any);
      
      const result = await service.signup({ email: "new@test.com", password: "password", fullname: "New User" });
      expect(usersService.create).toHaveBeenCalled();
      expect(emailService.sendVerificationEmail).toHaveBeenCalled();
      expect(result.message).toContain("successful");
    });
  });

  describe("verifyEmail", () => {
    it("should verify email successfully", async () => {
      usersService.findByEmail.mockResolvedValue({ id: "u-1", verified: false } as any);
      cacheService.get.mockResolvedValue("123456");
      usersService.update.mockResolvedValue({ id: "u-1", verified: true } as any);

      const result = await service.verifyEmail({ email: "test@test.com", otp: "123456" });
      expect(usersService.update).toHaveBeenCalledWith("u-1", { verified: true });
      expect(result.user.verified).toBe(true);
    });
  });

  describe("resetPassword", () => {
    it("should reset password successfully", async () => {
      usersService.findByEmail.mockResolvedValue({ id: "u-1" } as any);
      cacheService.get.mockResolvedValue("123456");

      const result = await service.resetPassword({ email: "t@t.com", otp: "123456", newPassword: "new" });
      expect(usersService.update).toHaveBeenCalled();
      expect(result.message).toContain("successfully");
    });
  });

  describe("updateProfile", () => {
    it("should update profile successfully", async () => {
      usersService.findById.mockResolvedValue(mockUser as any);
      usersService.update.mockResolvedValue({ ...mockUser, fullname: "New Name" } as any);

      const result = await service.updateProfile("user-1", { fullname: "New Name" });
      expect(result.data.fullname).toBe("New Name");
    });
  });
});
