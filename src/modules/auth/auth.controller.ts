import { Controller, Post, Res, Body, UseGuards, Get, Req, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { GithubAuthGuard, GoogleAuthGuard } from "./guards/oauth.guard";

import { AppConfig } from "@/config/app.config";
import { Public } from "@/common/decorators/public.decorator";
import { GetCurrentUser, GetCurrentUserId } from "@/common/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/request/signin.dto";
import { SignUpDto } from "./dto/request/signup.dto";
import { EmailOnlyDTO } from "./dto/request/email-only.dto";
import { VerifyOtpDTO } from "./dto/request/verify-otp.dto";
import { ResetPasswordDTO } from "./dto/request/reset-password.dto";
import { UpdateProfileDto } from "./dto/request/update-profile.dto";
import { UserResponseDto } from "./dto/response/user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  private getCookieOptions() {
    const { NODE_ENV } = this.configService.get<AppConfig>("env")!;
    return {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax" as const,
    };
  }

  private setAccessTokenToCookie(res: Response, accessToken: string) {
    res.cookie("accessToken", accessToken, this.getCookieOptions());
  }

  private clearAccessTokenCookie(res: Response) {
    res.clearCookie("accessToken", this.getCookieOptions());
  }

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // -------------------------------
  // SIGN UP + EMAIL VERIFICATION
  // -------------------------------

  @Post("signup")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user and send OTP for email verification" })
  @ApiResponse({
    status: 201,
    type: MessageResponseDto,
    description: "User registered successfully. OTP sent to email.",
  })
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post("verify-email")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify user email using OTP" })
  @ApiResponse({ status: 200, type: UserResponseDto, description: "Email verified successfully and user logged in." })
  async verifyEmail(@Body() verifyEmailDto: VerifyOtpDTO, @Res() res: Response) {
    const { accessToken, user } = await this.authService.verifyEmail(verifyEmailDto);
    this.setAccessTokenToCookie(res, accessToken);

    return res.json({
      user,
      message: "Email verified successfully. You are now logged in.",
    });
  }

  @Post("verify-email/resend-otp")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend email verification OTP" })
  @ApiResponse({ status: 200, type: MessageResponseDto, description: "OTP resent successfully." })
  async resendVerificationOtp(@Body() dto: EmailOnlyDTO) {
    return this.authService.resendOtp(dto.email, true);
  }

  // -------------------------------
  // PASSWORD RESET FLOW
  // -------------------------------

  @Post("forgot-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Send OTP to email for password reset" })
  @ApiResponse({ status: 200, type: MessageResponseDto, description: "OTP sent to email successfully." })
  async forgotPassword(@Body() dto: EmailOnlyDTO) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post("verify-forgot-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify OTP for password reset" })
  @ApiResponse({ status: 200, type: MessageResponseDto, description: "OTP verified successfully." })
  async verifyResetPasswordOtp(@Body() verifyEmailDto: VerifyOtpDTO) {
    return this.authService.verifyResetPassword(verifyEmailDto);
  }

  @Post("reset-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password using OTP" })
  @ApiResponse({ status: 200, type: MessageResponseDto, description: "Password reset successfully." })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post("forgot-password/resend-otp")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend password reset OTP" })
  @ApiResponse({ status: 200, type: MessageResponseDto, description: "OTP resent successfully." })
  async resendPasswordResetOtp(@Body() dto: EmailOnlyDTO) {
    return this.authService.resendOtp(dto.email, false);
  }

  // -------------------------------
  // GOOGLE OAUTH
  // -------------------------------

  @Get("google")
  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Initiate Google OAuth login" })
  async googleAuth() {}

  @Get("google/callback")
  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Google OAuth callback" })
  async googleCallback(@GetCurrentUser() user, @Res() res: Response) {
    const accessToken = this.authService.signAccessTokenToken(user);
    this.setAccessTokenToCookie(res, accessToken);

    return res.redirect(this.configService.get<string>("OAUTH_SUCCESS_REDIRECT_URL")!);
  }

  // -------------------------------
  // GITHUB OAUTH
  // -------------------------------

  @Get("github")
  @Public()
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: "Initiate GitHub OAuth login" })
  async githubAuth() {}

  @Get("github/callback")
  @Public()
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: "GitHub OAuth callback" })
  async githubCallback(@GetCurrentUser() user, @Res() res: Response) {
    const accessToken = this.authService.signAccessTokenToken(user);
    this.setAccessTokenToCookie(res, accessToken);

    return res.redirect(this.configService.get<string>("OAUTH_SUCCESS_REDIRECT_URL")!);
  }

  // -------------------------------
  // SIGN IN / SIGN OUT
  // -------------------------------

  @Post("signin")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign in with verified email and password" })
  @ApiResponse({ status: 200, type: UserResponseDto, description: "Sign-in successful." })
  async signin(@Body() signInDto: SignInDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.signin(signInDto);
    this.setAccessTokenToCookie(res, accessToken);
    return res.json({ user, message: "Signed in successfully." });
  }

  @Post("signout")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign out (clear auth cookie)" })
  @ApiResponse({ status: 200, type: MessageResponseDto, description: "Signed out successfully." })
  logout(@Res() res: Response) {
    this.clearAccessTokenCookie(res);
    return res.json({ message: "Signed out successfully." });
  }

  // -------------------------------
  // AUTHENTICATED USER
  // -------------------------------

  @Get("me")
  @ApiOperation({ summary: "Get currently authenticated user" })
  @ApiResponse({ status: 200, type: UserResponseDto, description: "User data retrieved successfully." })
  async getCurrentUser(@GetCurrentUserId() userId: string) {
    return await this.authService.getUserData(userId);
  }

  @Patch("me")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update current user profile" })
  @ApiResponse({ status: 200, type: UserResponseDto, description: "Profile updated successfully." })
  async updateProfile(@GetCurrentUserId() userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    console.log(updateProfileDto);

    return await this.authService.updateProfile(userId, updateProfileDto);
  }
}
