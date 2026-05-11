import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, SendMailOptions } from "nodemailer";

import { AppConfig } from "@/config/app.config";
import { SendEmailDto } from "./dto/send-email.dto";

@Injectable()
export class EmailService {
  private readonly emailUser: string;
  private readonly emailPass: string;

  constructor(private readonly configService: ConfigService) {
    const { EMAIL_VERIFIER_USER, EMAIL_VERIFIER_PASS } = this.configService.get<AppConfig>("env")!;
    this.emailUser = EMAIL_VERIFIER_USER;
    this.emailPass = EMAIL_VERIFIER_PASS;
  }

  /** Create a reusable transporter instance for Gmail SMTP */
  private emailTransport() {
    return createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: this.emailUser,
        pass: this.emailPass,
      },
    });
  }

  /** Send a generic HTML email */
  async sendEmail(dto: SendEmailDto) {
    const { recipients, subject, html } = dto;
    const transporter = this.emailTransport();

    const mailOptions: SendMailOptions = {
      from: `"PlanWise" <${this.emailUser}>`,
      to: recipients,
      subject,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new InternalServerErrorException("Failed to send email.");
    }
  }

  /** Helper for building consistent OTP email HTML */
  private buildOtpHtml(title: string, intro: string, code: string, footerNote?: string) {
    return `
    <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px; margin: 0;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 24px;">
        <tr>
          <td>
            <h2 style="color: #333333; text-align: center;">${title}</h2>
            <p style="font-size: 15px; color: #555555;">${intro}</p>

            <div style="text-align: center; margin: 24px 0;">
              <div style="display: inline-block; background-color: #f2f4f7; color: #111111; padding: 14px 28px; border-radius: 6px; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
                ${code}
              </div>
            </div>

            <p style="color: #555555; font-size: 14px;">This OTP will expire in <strong>5 minutes</strong>.</p>
            ${footerNote ? `<p style="color: #777777; font-size: 13px; margin-top: 12px;">${footerNote}</p>` : ""}

            <p style="margin-top: 32px; color: #444444;">Best regards,<br /><strong>The PlanWise Team</strong></p>
          </td>
        </tr>
      </table>
    </body>`;
  }
  private buildLinkMember() {
    return `<a href="https://planwise.vercel.app/" style="color: #1a73e8; text-decoration: none;">PlanWise</a>`;
  }

  /** Build invite member link HTML with projectId and roleId */
  private buildInviteMemberLink(projectId: string, roleId: string): string {
    const domain = this.configService.get<string>("DOMAIN");
    const isLocal = domain === "localhost";
    const baseUrl = isLocal ? "http://localhost:3000" : "https://planwise.id.vn";
    const inviteUrl = `${baseUrl}/invite-member?projectId=${projectId}&roleId=${roleId}`;
    return `<a href="${inviteUrl}" style="color: #ffffff; text-decoration: none; background-color: #1a73e8; padding: 12px 24px; border-radius: 6px; display: inline-block; font-weight: bold;">Accept Invitation</a>`;
  }

  /** Send invitation email for project member */
  async sendInviteMemberEmail(
    email: string,
    projectName: string,
    inviterName: string,
    projectId: string,
    roleId: string,
  ) {
    const inviteLinkButton = this.buildInviteMemberLink(projectId, roleId);
    const domain = this.configService.get<string>("DOMAIN");
    const isLocal = domain === "localhost";
    const baseUrl = isLocal ? "http://localhost:3000" : "https://planwise.id.vn";
    const inviteUrl = `${baseUrl}/invite-member?projectId=${projectId}&roleId=${roleId}`;

    const html = `
    <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px; margin: 0;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 24px;">
        <tr>
          <td>
            <h2 style="color: #333333; text-align: center;">You're Invited to Join a Project</h2>
            
            <p style="font-size: 15px; color: #555555;">
              Hello,<br /><br />
              <strong>${inviterName}</strong> has invited you to join the project <strong>${projectName}</strong> on ${this.buildLinkMember()}.
            </p>

            <div style="background-color: #f2f4f7; border-left: 4px solid #1a73e8; padding: 16px; margin: 24px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #555555;">
                <strong>Project:</strong> ${projectName}<br />
                <strong>Invited by:</strong> ${inviterName}
              </p>
            </div>

            <p style="font-size: 15px; color: #555555; text-align: center; margin: 24px 0;">
              Click the button below to accept the invitation and join the project:
            </p>

            <div style="text-align: center; margin: 24px 0;">
              ${inviteLinkButton}
            </div>

            <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 16px;">
              Or copy and paste this link in your browser:<br />
              <span style="word-break: break-all; color: #1a73e8;">${inviteUrl}</span>
            </p>

            <p style="color: #555555; font-size: 14px; margin-top: 24px;">
              If you don't recognize this invitation or did not request it, you can safely ignore this email.
            </p>

            <p style="margin-top: 32px; color: #444444;">Best regards,<br /><strong>The PlanWise Team</strong></p>
          </td>
        </tr>
      </table>
    </body>`;

    await this.sendEmail({
      recipients: [email],
      subject: `You're Invited to Join ${projectName} on PlanWise`,
      html,
    });
  }
  /** Send OTP for account verification */
  async sendVerificationEmail(email: string, otp: string) {
    const html = this.buildOtpHtml(
      "Verify Your PlanWise Account",
      `Hello,<br /><br />
      Thank you for signing up with <strong>PlanWise</strong>.<br />
      Please use the OTP below to verify your email and complete registration.`,
      otp,
      `If you didn't request this, please ignore this email.`,
    );

    await this.sendEmail({
      recipients: [email],
      subject: "Your PlanWise Email Verification OTP",
      html,
    });
  }

  /** Send OTP for password reset */
  async sendPasswordResetEmail(email: string, otp: string) {
    const html = this.buildOtpHtml(
      "Reset Your PlanWise Password",
      `Hello,<br /><br />
      We received a request to reset the password for your <strong>PlanWise</strong> account.<br />
      Please use the OTP below to proceed with resetting your password.`,
      otp,
      `If you didn't request a password reset, you can safely ignore this message.`,
    );

    await this.sendEmail({
      recipients: [email],
      subject: "Your PlanWise Password Reset OTP",
      html,
    });
  }

  /** Send project invitation email */
  async sendProjectInvitationEmail(
    email: string,
    fullname: string,
    projectName: string,
    roleName: string,
    projectId: string,
  ) {
    const appConfig = this.configService.get<AppConfig>("env")!;
    const frontendUrl = appConfig.CORS_ORIGIN;
    const invitationLink = `${frontendUrl}/invite-member/?projectId=${projectId}`;

    const html = `
    <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px; margin: 0;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 24px;">
        <tr>
          <td>
            <h2 style="color: #333333; text-align: center;">Project Invitation</h2>
            <p style="font-size: 15px; color: #555555;">
              Hello ${fullname},<br /><br />
              You have been invited to join the project <strong>${projectName}</strong> on PlanWise with the role <strong>${roleName}</strong>.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${invitationLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
                View Invitation
              </a>
            </div>

            <p style="color: #555555; font-size: 14px;">
              If you prefer not to accept this invitation, you can decline it directly in your account.
            </p>

            <p style="margin-top: 32px; color: #444444;">Best regards,<br /><strong>The PlanWise Team</strong></p>
          </td>
        </tr>
      </table>
    </body>`;

    await this.sendEmail({
      recipients: [email],
      subject: `You're invited to join ${projectName}`,
      html,
    });
  }
}
