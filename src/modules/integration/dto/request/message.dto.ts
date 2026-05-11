import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { IntegrationProvider } from "prisma/client/pg";

export class ListMessagesQueryDto {
  @ApiProperty({ enum: IntegrationProvider, default: IntegrationProvider.GOOGLE_GMAIL })
  @IsEnum(IntegrationProvider)
  provider!: IntegrationProvider;

  @ApiProperty()
  @IsString()
  connectionId!: string;

  @ApiPropertyOptional({ description: "Gmail search query. Example: from:someone@example.com is:unread" })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ type: [String], description: "Filter by label IDs, e.g. INBOX, UNREAD" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labelIds?: string[];

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxResults?: number;
}

export class CreateMessageDto {
  @ApiProperty({ enum: IntegrationProvider, default: IntegrationProvider.GOOGLE_GMAIL })
  @IsEnum(IntegrationProvider)
  provider!: IntegrationProvider;

  @ApiProperty()
  @IsString()
  connectionId!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  to!: string[];

  @ApiProperty()
  @IsString()
  subject!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bodyText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bodyHtml?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cc?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bcc?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  threadId?: string;
}

export class UpdateMessageDto {
  @ApiPropertyOptional({ type: [String], description: "Gmail labels to add" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  addLabelIds?: string[];

  @ApiPropertyOptional({ type: [String], description: "Gmail labels to remove" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  removeLabelIds?: string[];

  @ValidateIf((obj) => !obj.addLabelIds?.length && !obj.removeLabelIds?.length)
  @IsString({ message: "At least one of addLabelIds or removeLabelIds must be provided" })
  private readonly _validationGuard?: string;
}
