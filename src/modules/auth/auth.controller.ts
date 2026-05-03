import { Controller, Post, Res, Body, UseGuards, Get, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { type Response } from "express";

import { AppConfig } from "@/config/app.config";
import { Public } from "@/decorators/public.decorator";
import { GetCurrentUser, GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { GithubAuthGuard, GoogleAuthGuard } from "./guards/oauth.guard";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/request/signin.dto";
import { SignUpDto } from "./dto/request/signup.dto";
import { EmailOnlyDto } from "./dto/request/email-only.dto";
import { VerifyOtpDto } from "./dto/request/verify-otp.dto";
import { ResetPasswordDto } from "./dto/request/reset-password.dto";
import { UpdateProfileDto } from "./dto/request/update-profile.dto";
import { ExchangeTokenDto } from "./dto/request/exchange-token.dto";
import { UserResponse } from "./dto/response/user-response.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  private getCookieOptions() {
    const { NODE_ENV, DOMAIN } = this.configService.get<AppConfig>("env")!;

    return {
      httpOnly: true,
      domain: DOMAIN,
      sameSite: "lax" as const,
      secure: (NODE_ENV as string) === "production",
    };
  }

  private setAccessTokenToCookie(res: Response, accessToken: string) {
    res.cookie("esiwnalp_keton", accessToken, this.getCookieOptions());
  }

  private clearAccessTokenCookie(res: Response) {
    res.clearCookie("esiwnalp_keton", this.getCookieOptions());
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
    type: MessageOnlyResponse,
    description: "User registered successfully. OTP sent to email.",
  })
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post("verify-email")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify user email using OTP" })
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: "Email verified successfully and user logged in.",
  })
  async verifyEmail(@Body() verifyEmailDto: VerifyOtpDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.verifyEmail(verifyEmailDto);
    this.setAccessTokenToCookie(res, accessToken);

    return res.json(new UserResponse(user, "Email verified successfully. You are now logged in."));
  }

  @Post("verify-email/resend-otp")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend email verification OTP" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "OTP resent successfully.",
  })
  resendVerificationOtp(@Body() dto: EmailOnlyDto) {
    return this.authService.resendOtp(dto.email, true);
  }

  // -------------------------------
  // PASSWORD RESET FLOW
  // -------------------------------

  @Post("forgot-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Send OTP to email for password reset" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "OTP sent to email successfully.",
  })
  forgotPassword(@Body() dto: EmailOnlyDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post("verify-forgot-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify OTP for password reset" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "OTP verified successfully.",
  })
  verifyResetPasswordOtp(@Body() verifyEmailDto: VerifyOtpDto) {
    return this.authService.verifyResetPassword(verifyEmailDto);
  }

  @Post("reset-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password using OTP" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "Password reset successfully.",
  })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post("forgot-password/resend-otp")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend password reset OTP" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "OTP resent successfully.",
  })
  resendPasswordResetOtp(@Body() dto: EmailOnlyDto) {
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
    const otc = await this.authService.handleOAuthCallback(user);
    return res.redirect(this.configService.get<string>("OAUTH_SUCCESS_REDIRECT_URL")! + `?otc=${otc}`);
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
    const otc = await this.authService.handleOAuthCallback(user);
    return res.redirect(this.configService.get<string>("OAUTH_SUCCESS_REDIRECT_URL")! + `?otc=${otc}`);
  }

  // -------------------------------
  // OAUTH TOKEN EXCHANGE
  // -------------------------------
  @Post("oauth/exchange-token")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Exchange OTC for access token after OAuth login" })
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: "Access token issued successfully.",
  })
  async exchangeOAuthToken(@Body() dto: ExchangeTokenDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.exchangeOAuthToken(dto.otc);
    this.setAccessTokenToCookie(res, accessToken);
    return res.json(new UserResponse(user, "Sign-in successful."));
  }

  // -------------------------------
  // SIGN IN / SIGN OUT
  // -------------------------------

  @Post("signin")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign in with verified email and password" })
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: "Sign-in successful.",
  })
  async signin(@Body() signInDto: SignInDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.signin(signInDto);
    this.setAccessTokenToCookie(res, accessToken);
    return res.json(new UserResponse(user, "Sign-in successful."));
  }

  @Post("signout")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign out (clear auth cookie)" })
  @ApiResponse({
    status: 200,
    type: MessageOnlyResponse,
    description: "Signed out successfully.",
  })
  logout(@Res() res: Response) {
    this.clearAccessTokenCookie(res);
    return res.json(new MessageOnlyResponse("Signed out successfully."));
  }

  // -------------------------------
  // AUTHENTICATED USER
  // -------------------------------

  @Get("me")
  @ApiOperation({ summary: "Get currently authenticated user" })
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: "User data retrieved successfully.",
  })
  getCurrentUser(@GetCurrentUserId() userId: string) {
    return this.authService.getUserData(userId);
  }

  @Patch("me")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update current user profile" })
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: "Profile updated successfully.",
  })
  updateProfile(@GetCurrentUserId() userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(userId, updateProfileDto);
  }
}
