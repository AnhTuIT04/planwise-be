import {
  Controller,
  Post,
  Res,
  Body,
  UseGuards,
  Get,
  Req,
  HttpCode,
  HttpStatus,
  Patch,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { GithubAuthGuard, GoogleAuthGuard } from "./guards/oauth.guard";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";

import { AppConfig } from "@/config/app.config";
import { Public } from "@/decorators/public.decorator";
import { GetCurrentUser, GetCurrentUserId } from "@/decorators/get-current-user.decorator";
import { MessageResponseDto } from "@/common/dto/message.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/request/signin.dto";
import { SignUpDto } from "./dto/request/signup.dto";
import { EmailOnlyDto } from "./dto/request/email-only.dto";
import { VerifyOtpDto } from "./dto/request/verify-otp.dto";
import { ResetPasswordDto } from "./dto/request/reset-password.dto";
import { UpdateProfileDto } from "./dto/request/update-profile.dto";
import { UserResponseDto } from "./dto/response/user-response.dto";
import { ExchangeTokenDto } from "./dto/request/exchange-token.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  private getCookieOptions() {
    const { NODE_ENV, DOMAIN } = this.configService.get<AppConfig>("env")!;

    return {
      httpOnly: true,
      domain: DOMAIN,
      sameSite: "strict" as const,
      secure: NODE_ENV === "production",
    };
  }

  private setAccessTokenToCookie(res: Response, accessToken: string) {
    res.cookie("esiwnalp_keton", accessToken, this.getCookieOptions());
  }

  private setRefreshTokenToCookie(res: Response, refreshToken: string) {
    res.cookie("esiwnalp_hserfr", refreshToken, {
      ...this.getCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  private clearAccessTokenCookie(res: Response) {
    res.clearCookie("esiwnalp_keton", this.getCookieOptions());
  }

  private clearRefreshTokenCookie(res: Response) {
    res.clearCookie("esiwnalp_hserfr", this.getCookieOptions());
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
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: "Email verified successfully and user logged in.",
  })
  async verifyEmail(@Body() verifyEmailDto: VerifyOtpDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.verifyEmail(verifyEmailDto);
    this.setAccessTokenToCookie(res, accessToken);
    this.setRefreshTokenToCookie(res, refreshToken);

    return res.json(new UserResponseDto(user, "Email verified successfully. You are now logged in."));
  }

  @Post("verify-email/resend-otp")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend email verification OTP" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "OTP resent successfully.",
  })
  async resendVerificationOtp(@Body() dto: EmailOnlyDto) {
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
    type: MessageResponseDto,
    description: "OTP sent to email successfully.",
  })
  async forgotPassword(@Body() dto: EmailOnlyDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post("verify-forgot-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify OTP for password reset" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "OTP verified successfully.",
  })
  async verifyResetPasswordOtp(@Body() verifyEmailDto: VerifyOtpDto) {
    return this.authService.verifyResetPassword(verifyEmailDto);
  }

  @Post("reset-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password using OTP" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "Password reset successfully.",
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post("forgot-password/resend-otp")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend password reset OTP" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "OTP resent successfully.",
  })
  async resendPasswordResetOtp(@Body() dto: EmailOnlyDto) {
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
    type: UserResponseDto,
    description: "Access token issued successfully.",
  })
  async exchangeOAuthToken(@Body() dto: ExchangeTokenDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.exchangeOAuthToken(dto.otc);
    this.setAccessTokenToCookie(res, accessToken);
    return res.json(new UserResponseDto(user, "Sign-in successful."));
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
    type: UserResponseDto,
    description: "Sign-in successful.",
  })
  async signin(@Body() signInDto: SignInDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.signin(signInDto);
    this.setAccessTokenToCookie(res, accessToken);
    this.setRefreshTokenToCookie(res, refreshToken);
    return res.json(new UserResponseDto(user, "Sign-in successful."));
  }

  @Post("signout")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign out (clear auth cookie)" })
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: "Signed out successfully.",
  })
  logout(@Res() res: Response) {
    this.clearAccessTokenCookie(res);
    this.clearRefreshTokenCookie(res);
    return res.json(new MessageResponseDto("Signed out successfully."));
  }

  @Post("refresh")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token using refresh token" })
  @ApiResponse({
    status: 200,
    description: "New access token generated successfully.",
  })
  async refresh(@Req() req: any, @Res() res: Response) {
    const refreshToken = req.cookies["esiwnalp_hserfr"];

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }

    const accessToken = await this.authService.refreshAccessToken(refreshToken);
    this.setAccessTokenToCookie(res, accessToken);
    console.log("New access token generated via refresh token.");
    return res.json({ accessToken, message: "Access token refreshed successfully." });
  }

  // -------------------------------
  // AUTHENTICATED USER
  // -------------------------------

  @Get("me")
  @ApiOperation({ summary: "Get currently authenticated user" })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: "User data retrieved successfully.",
  })
  async getCurrentUser(@GetCurrentUserId() userId: string) {
    return await this.authService.getUserData(userId);
  }

  @Patch("me")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update current user profile" })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: "Profile updated successfully.",
  })
  async updateProfile(@GetCurrentUserId() userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return await this.authService.updateProfile(userId, updateProfileDto);
  }
}
