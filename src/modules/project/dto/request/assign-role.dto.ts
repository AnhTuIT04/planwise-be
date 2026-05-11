import { IsUUID, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AssignRoleDto {
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    example: "923e9512-9319-48a3-8bf4-53b4a1e7b8b7",
    description: "The ID of the role to assign to the member",
  })
  readonly roleId!: string;
}
