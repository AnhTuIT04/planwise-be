import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsUUID } from "class-validator";

export class ChangeUserRoleDto {
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of user whose role is to be changed",
  })
  readonly userId!: string;
}
