import { IsString, IsEmail } from "class-validator";

export class SendEmailDto {
  @IsEmail({}, { each: true })
  recipients!: string[];

  @IsString()
  subject!: string;

  @IsString()
  html!: string;
}
