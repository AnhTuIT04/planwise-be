import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto, VerifyEmailDto } from './dto/signup.dto';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }
    
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async logout() {
    // Implement any additional logout logic here if needed
    // For example: invalidating tokens, clearing sessions, etc.
    return { message: 'Logged out successfully' };
  }

  async generateVerificationCode(): Promise<string> {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async signup(signupDto: SignupDto) {
    // Kiểm tra email đã tồn tại
    const existingUser = await this.usersService.findByEmail(signupDto.email);
    if (existingUser) {
      if (existingUser.isVerified) {
        // Nếu email đã được xác thực thì không cho tạo lại
        throw new ConflictException('Email already exists');
      }

      // Nếu email tồn tại nhưng chưa xác thực -> cập nhật password và gửi mã xác thực mới
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const verificationCode = await this.generateVerificationCode();
      const verificationCodeExpiry = new Date();
      verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 6);

      await this.usersService.update(existingUser.id, {
        password: hashedPassword,
        verificationCode,
        verificationCodeExpiry,
      });

      let emailSent = true;
      try {
        await this.emailService.sendVerificationEmail(
          signupDto.email,
          verificationCode,
        );
      } catch (err) {
        emailSent = false;
        console.error('Failed to send verification email:', err);
      }

      return {
        message: 'Registration successful. Please check your email for verification code.',
        userId: existingUser.id,
        emailSent,
      };
    }

    // Tạo mã hash cho password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Tạo mã xác thực
    const verificationCode = await this.generateVerificationCode();
    const verificationCodeExpiry = new Date();
    verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 6);

    // Tạo user mới
    const newUser = await this.usersService.create({
      email: signupDto.email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiry,
    });

    // Gửi email xác thực (nếu có lỗi gửi email, không làm hỏng signup)
    let emailSent = true;
    try {
      await this.emailService.sendVerificationEmail(
        signupDto.email,
        verificationCode,
      );
    } catch (err) {
      emailSent = false;
      console.error('Failed to send verification email:', err);
    }

    return {
      message: 'Registration successful. Please check your email for verification code.',
      userId: newUser.id,
      emailSent,
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.usersService.findByEmail(verifyEmailDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (user.verificationCode !== verifyEmailDto.verificationCode) {
      throw new BadRequestException('Invalid verification code');
    }

    if (new Date() > user.verificationCodeExpiry) {
      // Tạo mã xác thực mới nếu mã cũ đã hết hạn
      const newVerificationCode = await this.generateVerificationCode();
      const newExpiry = new Date();
      newExpiry.setMinutes(newExpiry.getMinutes() + 6);

      await this.usersService.update(user.id, {
        verificationCode: newVerificationCode,
        verificationCodeExpiry: newExpiry,
      });

      await this.emailService.sendVerificationEmail(
        user.email,
        newVerificationCode,
      );

      throw new BadRequestException('Verification code expired. New code sent to your email.');
    }

    // Xác thực thành công
    await this.usersService.update(user.id, {
      isVerified: true,
      verificationCode: undefined,
      verificationCodeExpiry: undefined,
    });

    return {
      message: 'Email verified successfully',
    };
  }

  async resendVerificationCode({ email }: { email: string }) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    const now = new Date();
    if (user.verificationCodeExpiry && now < user.verificationCodeExpiry) {
      // Mã hiện tại chưa hết hạn -> không gửi lại
      throw new BadRequestException('Verification code is still valid. Please wait until it expires to request a new one.');
    }

    // Tạo mã mới và gửi
    const newVerificationCode = await this.generateVerificationCode();
    const newExpiry = new Date();
    newExpiry.setMinutes(newExpiry.getMinutes() + 6);

    await this.usersService.update(user.id, {
      verificationCode: newVerificationCode,
      verificationCodeExpiry: newExpiry,
    });

    try {
      await this.emailService.sendVerificationEmail(user.email, newVerificationCode);
    } catch (err) {
      console.error('Failed to resend verification email:', err);
      throw new BadRequestException('Failed to resend verification email');
    }

    return {
      message: 'New verification code sent to your email.',
    };
  }
}