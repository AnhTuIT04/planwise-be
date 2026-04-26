import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('EmailService', () => {
  let service: EmailService;
  let configService: any;
  let mockTransporter: any;

  beforeEach(async () => {
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: '123' }),
    };
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({
              EMAIL_VERIFIER_USER: 'test@gmail.com',
              EMAIL_VERIFIER_PASS: 'password',
              CORS_ORIGIN: 'http://localhost:3000',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email using nodemailer', async () => {
      await service.sendEmail({
        recipients: ['to@example.com'],
        subject: 'Test',
        html: '<p>Hello</p>',
      });
      expect(mockTransporter.sendMail).toHaveBeenCalled();
    });
  });

  describe('sendVerificationEmail', () => {
    it('should call sendEmail with verification html', async () => {
      const sendEmailSpy = jest.spyOn(service, 'sendEmail').mockResolvedValue(undefined);
      await service.sendVerificationEmail('test@example.com', '123456');
      expect(sendEmailSpy).toHaveBeenCalled();
      expect(sendEmailSpy.mock.calls[0][0].subject).toContain('Verification');
    });
  });
});
