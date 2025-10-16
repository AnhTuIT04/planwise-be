import { Controller, Post, Res, Body, UseGuards, Get, Req, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { GithubAuthGuard, GoogleAuthGuard } from "./guards/oauth.guard";

import { AppConfig } from "@/config/app.config";
import { Public } from "@/common/decorators/public.decorator";
import { GetCurrentUserId } from "@/common/decorators/get-current-user.decorator";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";
import { EmailOnlyDTO } from "./dto/email-only.dto";
import { VerifyEmailDTO } from "./dto/verify-email.dto";
import { ResetPasswordDTO } from "./dto/reset-password.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  private setAccessTokenToCookie(res: Response, accessToken: string) {
    const { NODE_ENV } = this.configService.get<AppConfig>("env")!;
    console.log({ tokennnnn: accessToken });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
    });
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
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post("verify-email")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify user email using OTP" })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDTO, @Res() res: Response) {
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
  async forgotPassword(@Body() dto: EmailOnlyDTO) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post("forgot-password/resend-otp")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend password reset OTP" })
  async resendPasswordResetOtp(@Body() dto: EmailOnlyDTO) {
    return this.authService.resendOtp(dto.email, false);
  }

  @Post("reset-password")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password using OTP" })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  // -------------------------------
  // GOOGLE OAUTH
  // -------------------------------

  @Get("google")
  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Initiate Google OAuth login" })
  async googleAuth() {
    // Hello world
  }

  @Get("google/callback")
  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Google OAuth callback" })
  async googleCallback(@Req() req, @Res() res: Response) {
    // `req.user` comes from GoogleStrategy.validate()
    const { user } = req;
    const accessToken = await this.authService.signOAuthToken(user);

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
  async githubAuth() {
    // Redirects automatically to GitHub
  }

  @Get("github/callback")
  @Public()
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: "GitHub OAuth callback" })
  async githubCallback(@Req() req, @Res() res: Response) {
    const { user } = req;
    const accessToken = await this.authService.signOAuthToken(user);

    const redirectUrl = `${this.configService.get<string>("OAUTH_SUCCESS_REDIRECT_URL")}?status=success`;
    this.setAccessTokenToCookie(res, accessToken);
    return res.redirect(redirectUrl);
  }

  // -------------------------------
  // SIGN IN / SIGN OUT
  // -------------------------------

  @Post("signin")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign in with verified email and password" })
  async signin(@Body() signInDto: SignInDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.signin(signInDto);
    this.setAccessTokenToCookie(res, accessToken);
    return res.json({ accessToken, user, message: "Signed in successfully." });
  }

  @Post("signout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign out (clear auth cookie)" })
  logout(@Res() res: Response) {
    res.clearCookie("accessToken");
    return res.json({ message: "Signed out successfully." });
  }

  // -------------------------------
  // AUTHENTICATED USER
  // -------------------------------

  @Get("me")
  @ApiOperation({ summary: "Get currently authenticated user" })
  async getCurrentUser(@GetCurrentUserId() userId: string) {
    console.log({ hahahah: userId });
    return await this.authService.getUserData(userId);
  }
}
