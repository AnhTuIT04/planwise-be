// THE ULTIMATE MOCK - MUST BE AT THE VERY TOP
jest.mock("nodemailer", () => ({
  __esModule: true,
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn((options, callback) => {
      if (callback) callback(null, { messageId: "mock-id-123" });
      return Promise.resolve({ messageId: "mock-id-123" });
    }),
  }),
}));

import { InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { EmailService } from "./email.service";

describe("EmailService", () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({
              EMAIL_VERIFIER_USER: "test@gmail.com",
              EMAIL_VERIFIER_PASS: "pass",
              CORS_ORIGIN: "http://localhost:3000",
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  describe("sendEmail", () => {
    it("should send email successfully", async () => {
      await service.sendEmail({ 
        recipients: ["dest@example.com"], 
        subject: "Test", 
        html: "<p>Hello</p>" 
      });
    });

    it("should throw InternalServerErrorException if sendMail fails", async () => {
      const nodemailer = require("nodemailer");
      nodemailer.createTransport().sendMail.mockRejectedValueOnce(new Error("SMTP Error"));
      
      await expect(service.sendEmail({ 
        recipients: ["dest@example.com"], 
        subject: "Test", 
        html: "" 
      })).rejects.toThrow(InternalServerErrorException);
    });
  });
});
