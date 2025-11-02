import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "@/modules/users/users.service";
import { CacheService } from "@/modules/cache/cache.service";
import { EmailService } from "@/modules/email/email.service";
import { JwtPayloadDTO } from "./dto/request/jwt-payload.dto";
import { SignInDto } from "./dto/request/signin.dto";
import { SignUpDto } from "./dto/request/signup.dto";
import { VerifyOtpDTO } from "./dto/request/verify-otp.dto";
import { ResetPasswordDTO } from "./dto/request/reset-password.dto";
import { UpdateProfileDto } from "./dto/request/update-profile.dto";

@Injectable()
export class AuthService {
  private readonly OTP_TTL = 5 * 60; // 5 minutes
  private readonly OTP_CACHE_KEY_PREFIX = "auth-service:otp_";

  constructor(
    private usersService: UsersService,
    private cacheService: CacheService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit numeric OTP
  }

  signAccessTokenToken(user: { id: string; email: string }) {
    const payload: JwtPayloadDTO = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async signup(signUpDto: SignUpDto) {
    const existingUser = await this.usersService.findByEmail(signUpDto.email);
    if (existingUser && existingUser.verified) {
      throw new ConflictException("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const otp = this.generateOtp();

    await Promise.all([
      this.cacheService.set(this.OTP_CACHE_KEY_PREFIX + signUpDto.email, otp, this.OTP_TTL),
      this.usersService.createOrUpdate(signUpDto.email, {
        email: signUpDto.email,
        fullname: signUpDto.fullname,
        password: hashedPassword,
      }),
    ]);

    // Send verification email but don't await to avoid delaying response
    this.emailService.sendVerificationEmail(signUpDto.email, otp).catch((err) => {
      console.error("Failed to send verification email:", err);
    });

    return {
      message: "Signup successful. Please check your email for the OTP to verify your account.",
    };
  }

  async verifyEmail(verifyEmailDto: VerifyOtpDTO) {
    const existingUser = await this.usersService.findByEmail(verifyEmailDto.email);
    if (!existingUser) {
      throw new BadRequestException("User not found");
    }

    if (existingUser.verified) {
      throw new BadRequestException("Email is already verified");
    }

    const cachedOtp = await this.cacheService.get<string>(this.OTP_CACHE_KEY_PREFIX + verifyEmailDto.email);

    if (!cachedOtp || cachedOtp !== verifyEmailDto.otp) {
      throw new BadRequestException("Invalid or expired OTP");
    }

    // Mark user as verified and clear cached OTP
    const [{ password, ...user }] = await Promise.all([
      this.usersService.update(existingUser.id, { verified: true }),
      this.cacheService.del(this.OTP_CACHE_KEY_PREFIX + verifyEmailDto.email),
    ]);

    const accessToken = this.signAccessTokenToken({ id: user.id, email: user.email });

    return {
      message: "Email verified successfully.",
      accessToken,
      user: user,
    };
  }

  async resendOtp(email: string, isForVerification: boolean) {
    const cachedOtp = await this.cacheService.get<string>(this.OTP_CACHE_KEY_PREFIX + email);
    if (cachedOtp) {
      throw new BadRequestException(
        "An OTP has already been sent. Please wait a few minutes before requesting a new one.",
      );
    }

    const existingUser = await this.usersService.findByEmail(email);
    if (!existingUser) {
      throw new BadRequestException("User not found");
    }

    if (isForVerification && existingUser.verified) {
      throw new BadRequestException("Email is already verified");
    }

    const otp = this.generateOtp();

    await this.cacheService.set(this.OTP_CACHE_KEY_PREFIX + email, otp, this.OTP_TTL);

    // Send appropriate email based on context but don't await to avoid delaying response
    if (isForVerification) {
      this.emailService.sendVerificationEmail(email, otp);
    } else {
      this.emailService.sendPasswordResetEmail(email, otp);
    }

    return {
      message: `A new OTP has been sent to your email for ${isForVerification ? "verification" : "password reset"}.`,
    };
  }

  async forgotPassword(email: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (!existingUser) {
      throw new BadRequestException("User not found");
    }

    const otp = this.generateOtp();

    await Promise.all([
      this.cacheService.set(this.OTP_CACHE_KEY_PREFIX + email, otp, this.OTP_TTL),
      this.emailService.sendPasswordResetEmail(email, otp),
    ]);

    return {
      message: "OTP for password reset has been sent to your email.",
    };
  }

  async verifyResetPassword(verifyPasswordDto: VerifyOtpDTO) {
    const existingUser = await this.usersService.findByEmail(verifyPasswordDto.email);
    if (!existingUser) {
      throw new BadRequestException("User not found");
    }

    const cachedOtp = await this.cacheService.get<string>(this.OTP_CACHE_KEY_PREFIX + verifyPasswordDto.email);

    if (!cachedOtp || cachedOtp !== verifyPasswordDto.otp) {
      throw new BadRequestException("Invalid or expired OTP");
    }

    return { message: "OTP verified successfully." };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDTO) {
    const existingUser = await this.usersService.findByEmail(resetPasswordDto.email);
    if (!existingUser) {
      throw new BadRequestException("User not found");
    }

    const cachedOtp = await this.cacheService.get<string>(this.OTP_CACHE_KEY_PREFIX + resetPasswordDto.email);

    if (!cachedOtp || cachedOtp !== resetPasswordDto.otp) {
      throw new BadRequestException("Invalid or expired OTP");
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

    await Promise.all([
      this.usersService.update(existingUser.id, { password: hashedPassword }),
      this.cacheService.del(this.OTP_CACHE_KEY_PREFIX + resetPasswordDto.email),
    ]);

    return { message: "Password has been reset successfully." };
  }

  async signin(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (!user.verified) {
      throw new UnauthorizedException("Please verify your email before signing in");
    }

    const accessToken = this.signAccessTokenToken({ id: user.id, email: user.email });

    return {
      message: "Sign-in successful.",
      accessToken,
      user,
    };
  }

  async getUserData(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const { password, ...result } = user;
    return {
      user: result,
      message: "User data retrieved successfully.",
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const existingUser = await this.usersService.findById(userId);
    if (!existingUser) {
      throw new UnauthorizedException("User not found");
    }

    // Only update fields that are provided
    const updateData: Record<string, any> = {};
    if (updateProfileDto.fullname !== undefined) {
      updateData.fullname = updateProfileDto.fullname;
    }
    if (updateProfileDto.avatarUrl !== undefined) {
      updateData.avatarUrl = updateProfileDto.avatarUrl;
    }

    // If no fields to update, return current user data
    if (Object.keys(updateData).length === 0) {
      const { password, ...result } = existingUser;
      return {
        user: result,
        message: "No changes were made.",
      };
    }

    const { password, ...updatedUser } = await this.usersService.update(userId, updateData);

    return {
      user: updatedUser,
      message: "Profile updated successfully.",
    };
  }

  async validateOAuthUser(
    provider: "google" | "github",
    profile: {
      email: string;
      fullname: string;
      avatarUrl: string;
    },
  ) {
    // Extract needed info from profile
    const { email, fullname: name, avatarUrl: avatar } = profile;

    let { password, ...user } = await this.usersService.createOrUpdate(
      email,
      {
        email,
        fullname: name,
        avatarUrl: avatar,
        verified: true,

        accounts: {
          create: {
            provider,
          },
        },
      },
      {
        accounts: {
          create: {
            provider,
          },
        },
      },
    );

    return user;
  }
}
