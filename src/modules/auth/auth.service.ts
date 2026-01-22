import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { User } from "prisma/client";
import { UsersService } from "@/modules/users/users.service";
import { CacheService } from "@/modules/cache/cache.service";
import { EmailService } from "@/modules/email/email.service";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { SignInDto } from "./dto/request/signin.dto";
import { SignUpDto } from "./dto/request/signup.dto";
import { VerifyOtpDto } from "./dto/request/verify-otp.dto";
import { ResetPasswordDto } from "./dto/request/reset-password.dto";
import { UpdateProfileDto } from "./dto/request/update-profile.dto";
import { UserResponseDto } from "./dto/response/user-response.dto";

@Injectable()
export class AuthService {
  private readonly OTP_TTL = 5 * 60; // 5 minutes
  private readonly OTP_CACHE_KEY_PREFIX = "auth-service:otp_";
  private readonly OTC_TTL = 1 * 60; // 1 minutes
  private readonly OTC_CACHE_KEY_PREFIX = "auth-service:otc_";

  constructor(
    private usersService: UsersService,
    private cacheService: CacheService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  private generateOtp() {
    // 6-digit numeric OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateOtc() {
    // 32-character alphanumeric one-time code
    const code = [...Array(32)].map(() => Math.random().toString(36)[2]).join("");
    return code;
  }

  async signAccessTokenToken(user: { id: string; email: string }) {
    const payload: JwtPayloadDto = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async signRefreshToken(user: { id: string; email: string }) {
    const payload: JwtPayloadDto = { sub: user.id, email: user.email };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });
    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.usersService.findById(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const accessToken = await this.signAccessTokenToken({ id: user.id, email: user.email });
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
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
      !existingUser
        ? this.usersService.create({
            email: signUpDto.email,
            fullname: signUpDto.fullname,
            password: hashedPassword,
          })
        : this.usersService.update(existingUser.id, {
            fullname: signUpDto.fullname,
            password: hashedPassword,
          }),
    ]);

    // Send verification email but don't await to avoid delaying response
    this.emailService.sendVerificationEmail(signUpDto.email, otp).catch((err) => {
      console.error("Failed to send verification email:", err);
    });

    return new MessageResponseDto("Signup successful. Please check your email for the OTP to verify your account.");
  }

  async verifyEmail(verifyEmailDto: VerifyOtpDto) {
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
    const [user] = await Promise.all([
      this.usersService.update(existingUser.id, { verified: true }),
      this.cacheService.del(this.OTP_CACHE_KEY_PREFIX + verifyEmailDto.email),
    ]);

    const accessToken = await this.signAccessTokenToken({ id: user.id, email: user.email });
    const refreshToken = await this.signRefreshToken({ id: user.id, email: user.email });

    return { accessToken, refreshToken, user };
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

    return new MessageResponseDto(
      `A new OTP has been sent to your email for ${isForVerification ? "verification" : "password reset"}.`,
    );
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

    return new MessageResponseDto("OTP for password reset has been sent to your email.");
  }

  async verifyResetPassword(verifyPasswordDto: VerifyOtpDto) {
    const existingUser = await this.usersService.findByEmail(verifyPasswordDto.email);
    if (!existingUser) {
      throw new BadRequestException("User not found");
    }

    const cachedOtp = await this.cacheService.get<string>(this.OTP_CACHE_KEY_PREFIX + verifyPasswordDto.email);

    if (!cachedOtp || cachedOtp !== verifyPasswordDto.otp) {
      throw new BadRequestException("Invalid or expired OTP");
    }

    return new MessageResponseDto("OTP verified successfully. You can now reset your password.");
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
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

    return new MessageResponseDto("Password has been reset successfully.");
  }

  async signin(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (!user.verified) {
      throw new UnauthorizedException("Please verify your email before signing in");
    }

    const accessToken = await this.signAccessTokenToken({ id: user.id, email: user.email });
    const refreshToken = await this.signRefreshToken({ id: user.id, email: user.email });

    return { accessToken, refreshToken, user };
  }

  async getUserData(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return new UserResponseDto(user, "User data retrieved successfully.");
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
      return new UserResponseDto(existingUser, "Profile retrieved successfully.");
    }

    const updatedUser = await this.usersService.update(userId, updateData);
    return new UserResponseDto(updatedUser, "Profile updated successfully.");
  }

  async handleOAuthCallback(user: User) {
    const otc = this.generateOtc();

    // Store the OTC with associated user data in cache
    await this.cacheService.set(this.OTC_CACHE_KEY_PREFIX + otc, user, this.OTC_TTL);
    return otc;
  }

  async exchangeOAuthToken(otc: string) {
    const user = await this.cacheService.get<User>(this.OTC_CACHE_KEY_PREFIX + otc);

    if (!user) {
      throw new BadRequestException("Invalid or expired one-time code (OTC)");
    }

    // Remove the OTC from cache after use
    await this.cacheService.del(this.OTC_CACHE_KEY_PREFIX + otc);

    const accessToken = await this.signAccessTokenToken({ id: user.id, email: user.email });
    return { accessToken, user };
  }

  async validateOAuthUser(
    provider: "GOOGLE" | "GITHUB",
    profile: {
      email: string;
      fullname: string;
      avatarUrl: string;
    },
  ) {
    const { email, fullname: name, avatarUrl: avatar } = profile;
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      return this.usersService.update(existingUser.id, {
        oauthAccounts: {
          connectOrCreate: {
            where: {
              userId_provider: {
                userId: existingUser.id,
                provider,
              },
            },
            create: {
              provider,
            },
          },
        },
      });
    }

    return this.usersService.create({
      email,
      fullname: name,
      avatarUrl: avatar,
      verified: true,
      oauthAccounts: {
        create: {
          provider,
        },
      },
    });
  }
}
