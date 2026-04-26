import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '@/modules/users/users.service';
import { CacheService } from '@/modules/cache/cache.service';
import { EmailService } from '@/modules/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: any;
  let cacheService: any;
  let emailService: any;
  let jwtService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: CacheService,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
            sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    cacheService = module.get<CacheService>(CacheService);
    emailService = module.get<EmailService>(EmailService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should signup a new user successfully', async () => {
      const signUpDto = { email: 'test@example.com', password: 'password', fullname: 'Test User' };
      usersService.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      usersService.create.mockResolvedValue({ id: 'user_id', ...signUpDto });

      const result = await service.signup(signUpDto);

      expect(result.message).toContain('Signup successful');
      expect(usersService.create).toHaveBeenCalled();
      expect(cacheService.set).toHaveBeenCalled();
      expect(emailService.sendVerificationEmail).toHaveBeenCalled();
    });

    it('should throw ConflictException if user exists and is verified', async () => {
      const signUpDto = { email: 'test@example.com', password: 'password', fullname: 'Test User' };
      usersService.findByEmail.mockResolvedValue({ verified: true });

      await expect(service.signup(signUpDto)).rejects.toThrow(ConflictException);
    });

    it('should update unverified existing user', async () => {
      const signUpDto = { email: 'test@example.com', password: 'password', fullname: 'Test User' };
      const existingUser = { id: 'user_id', verified: false };
      usersService.findByEmail.mockResolvedValue(existingUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      usersService.update.mockResolvedValue({ ...existingUser, ...signUpDto });

      await service.signup(signUpDto);

      expect(usersService.update).toHaveBeenCalledWith('user_id', expect.any(Object));
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      const verifyDto = { email: 'test@example.com', otp: '123456' };
      const user = { id: 'user_id', email: 'test@example.com', verified: false };
      usersService.findByEmail.mockResolvedValue(user);
      cacheService.get.mockResolvedValue('123456');
      usersService.update.mockResolvedValue({ ...user, verified: true });
      jwtService.sign.mockReturnValue('token');

      const result = await service.verifyEmail(verifyDto);

      expect(result.accessToken).toBe('token');
      expect(result.user.verified).toBe(true);
      expect(cacheService.del).toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid OTP', async () => {
      const verifyDto = { email: 'test@example.com', otp: 'wrong' };
      usersService.findByEmail.mockResolvedValue({ verified: false });
      cacheService.get.mockResolvedValue('123456');

      await expect(service.verifyEmail(verifyDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('signin', () => {
    it('should signin successfully', async () => {
      const signInDto = { email: 'test@example.com', password: 'password' };
      const user = { id: 'user_id', email: 'test@example.com', password: 'hashed_password', verified: true };
      usersService.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign.mockReturnValue('token');

      const result = await service.signin(signInDto);

      expect(result.accessToken).toBe('token');
      expect(result.user).toEqual(user);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const signInDto = { email: 'test@example.com', password: 'wrong_password' };
      usersService.findByEmail.mockResolvedValue({ password: 'hashed_password' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signin(signInDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if not verified', async () => {
      const signInDto = { email: 'test@example.com', password: 'password' };
      usersService.findByEmail.mockResolvedValue({ password: 'hashed_password', verified: false });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.signin(signInDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('forgotPassword', () => {
    it('should send reset OTP successfully', async () => {
      const email = 'test@example.com';
      usersService.findByEmail.mockResolvedValue({ id: 'user_id' });

      const result = await service.forgotPassword(email);

      expect(result.message).toContain('OTP for password reset has been sent');
      expect(cacheService.set).toHaveBeenCalled();
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      await expect(service.forgotPassword('wrong@example.com')).rejects.toThrow(BadRequestException);
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const resetDto = { email: 'test@example.com', otp: '123456', newPassword: 'new_password' };
      const user = { id: 'user_id', email: 'test@example.com' };
      usersService.findByEmail.mockResolvedValue(user);
      cacheService.get.mockResolvedValue('123456');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      usersService.update.mockResolvedValue({ ...user, password: 'hashed_password' });

      const result = await service.resetPassword(resetDto);

      expect(result.message).toContain('Password has been reset successfully');
      expect(usersService.update).toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid reset OTP', async () => {
      const resetDto = { email: 'test@example.com', otp: 'wrong', newPassword: 'pass' };
      usersService.findByEmail.mockResolvedValue({ id: 'user_id' });
      cacheService.get.mockResolvedValue('123456');

      await expect(service.resetPassword(resetDto)).rejects.toThrow(BadRequestException);
    });
  });
});
