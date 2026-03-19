import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IntegrationProvider } from 'prisma/client/pg';


export class ConnectProviderDto {
  @ApiProperty({ enum: IntegrationProvider })
  @IsEnum(IntegrationProvider)
  provider: IntegrationProvider;

  @ApiPropertyOptional({ description: 'Redirect URL after OAuth completes' })
  @IsOptional()
  @IsString()
  redirectUrl?: string;
}

export class OAuthCallbackDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiPropertyOptional({ description: 'Issuer (sent by Google)' })
  @IsOptional()
  @IsString()
  iss?: string;

  @ApiPropertyOptional({ description: 'Scopes granted' })
  @IsOptional()
  @IsString()
  scope?: string;

  @ApiPropertyOptional({ description: 'Auth user index' })
  @IsOptional()
  @IsString()
  authuser?: string;

  @ApiPropertyOptional({ description: 'Prompt type' })
  @IsOptional()
  @IsString()
  prompt?: string;

  @ApiPropertyOptional({ description: 'Hosted domain (Google Workspace)' })
  @IsOptional()
  @IsString()
  hd?: string;
}

class ReminderDto {
  @ApiProperty({ enum: ['email', 'popup'] })
  @IsString()
  method: string;

  @ApiProperty()
  @IsNumber()
  minutes: number;
}

export class CreateEventDto {
  @ApiProperty({ enum: IntegrationProvider })
  @IsEnum(IntegrationProvider)
  provider: IntegrationProvider;

  @ApiProperty()
  @IsString()
  connectionId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsDateString()
  startTime: string;

  @ApiProperty()
  @IsDateString()
  endTime: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAllDay?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attendees?: string[];

  @ApiPropertyOptional({ type: [ReminderDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReminderDto)
  reminders?: ReminderDto[];
}

export class UpdateEventDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAllDay?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ enum: ['confirmed', 'tentative', 'cancelled'] })
  @IsOptional()
  @IsString()
  status?: string;
}

export class ListEventsQueryDto {
  @ApiProperty({ enum: IntegrationProvider })
  @IsEnum(IntegrationProvider)
  provider: IntegrationProvider;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  timeMin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  timeMax?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxResults?: number;
}
