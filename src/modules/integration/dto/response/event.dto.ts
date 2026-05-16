import { ApiProperty } from "@nestjs/swagger";
import { IntegrationProvider } from "prisma/client/pg";

export class ConnectionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: IntegrationProvider })
  provider!: IntegrationProvider;

  @ApiProperty()
  accountIdentifier!: string;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({ type: [String] })
  scopes!: string[];

  @ApiProperty()
  createdAt!: Date;
}

export class AuthUrlResponseDto {
  @ApiProperty()
  authUrl!: string;
}

export class ConnectionSuccessDto {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  connectionId!: string;

  @ApiProperty()
  redirectUrl!: string;
}

export class EventResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  externalId!: string;

  @ApiProperty({ enum: IntegrationProvider })
  provider!: IntegrationProvider;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string | null;

  @ApiProperty()
  startTime!: Date;

  @ApiProperty()
  endTime!: Date;

  @ApiProperty()
  isAllDay!: boolean;

  @ApiProperty()
  location!: string | null;

  @ApiProperty()
  status!: string | null;

  @ApiProperty({ required: false, nullable: true })
  colorId!: string | null;

  @ApiProperty()
  syncedAt!: Date;
}

export class ConnectionDetailsResponseDto {
  @ApiProperty()
  connectionId!: string;

  @ApiProperty()
  events!: EventResponseDto[];
}
