/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ApproveDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'APPROVED / PENDING / REJECTED',
  })
  status: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '65982d2e-20ae-4bba-a073-f470b49514c6',
  })
  approved_by: string;
}
