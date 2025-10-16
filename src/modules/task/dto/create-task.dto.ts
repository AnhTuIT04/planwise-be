import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
  Min,
  IsDateString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

import { TaskStatus } from 'prisma/client';


export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Buy groceries", description: "The title of the task" })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "Need to buy milk and eggs", description: "The description of the task" })
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiProperty({ example: TaskStatus.TODO, description: "The status of the task" })
  statusId?: TaskStatus;

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({ example: 1, description: "The priority of the task" })
  priority?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: "2023-03-01", description: "The start date of the task" })
  startDate?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: "2023-03-02", description: "The due date of the task" })
  dueDate?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000", description: "The ID of the section the task belongs to" })
  sectionId?: string; // optional since section is nullable
}
