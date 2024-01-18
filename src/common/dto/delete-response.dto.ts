import { ApiProperty } from "@nestjs/swagger";

export class DeleteResponseDto {
  @ApiProperty({ example: "user deleted successfully" })
  message: string;

  @ApiProperty()
  data?: any;

  @ApiProperty({ example: null, nullable: true })
  errors?: { [key: string]: any };

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  status: number;
}