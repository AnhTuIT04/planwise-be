import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MessageBodyContentDto {
  @ApiPropertyOptional({ description: "Full email HTML body (can be rendered in iframe)" })
  html?: string;

  @ApiPropertyOptional({ description: "Email plain text body" })
  text?: string;
}

export class MessageIntegrationResponseDto {
  @ApiProperty()
  externalId!: string;

  @ApiProperty()
  threadId!: string;

  @ApiProperty()
  subject!: string;

  @ApiPropertyOptional()
  snippet?: string;

  @ApiPropertyOptional({ type: MessageBodyContentDto })
  body?: MessageBodyContentDto;

  @ApiPropertyOptional()
  from?: string;

  @ApiPropertyOptional()
  to?: string;

  @ApiPropertyOptional()
  cc?: string;

  @ApiPropertyOptional()
  receivedAt?: Date;

  @ApiProperty()
  isUnread!: boolean;

  @ApiProperty({ type: [String] })
  labelIds!: string[];
}

export class ConnectionMessageDetailsResponseDto {
  @ApiProperty()
  connectionId!: string;

  @ApiProperty({ type: [MessageIntegrationResponseDto] })
  messages!: MessageIntegrationResponseDto[];

  @ApiPropertyOptional({ description: "Token to fetch the next page from Google Gmail" })
  nextPageToken?: string;
}
