import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class QueryNotionDatabaseDto {
  @ApiPropertyOptional({ description: "Filter query based on Notion search properties" })
  @IsOptional()
  @IsString()
  query?: string;
}

export class ImportNotionTaskDto {
  @ApiProperty({ description: "The ID of the Notion page" })
  @IsNotEmpty()
  @IsString()
  notionPageId: string;

  @ApiProperty({ description: "The ID of the local project to attach" })
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @ApiPropertyOptional({ description: "The ID of the local section" })
  @IsOptional()
  @IsString()
  sectionId?: string;
}

export class CreateNotionDatabaseDto {
  @ApiProperty({ description: "Title of the new Database" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "ID of the parent Notion Page" })
  @IsNotEmpty()
  @IsString()
  parentPageId: string;

  @ApiPropertyOptional({ description: "Full Notion properties schema" })
  @IsOptional()
  properties?: any;
}

export class CreateNotionPageDto {
  @ApiProperty({ description: "Title of the new Notion Page (Task)" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "ID of the target Notion Database" })
  @IsNotEmpty()
  @IsString()
  databaseId: string;

  @ApiPropertyOptional({ description: "Full Notion properties payload for dynamic fields" })
  @IsOptional()
  properties?: any;
}

export class UpdateNotionPropertyDto {
  @ApiProperty({ description: "Name or ID of the Notion property" })
  @IsNotEmpty()
  @IsString()
  propertyId: string;

  @ApiProperty({ description: "Value to set" })
  @IsNotEmpty()
  value: any;

  @ApiProperty({ description: "Type of the Notion property (status, select, etc.)" })
  @IsNotEmpty()
  @IsString()
  type: string;
}
