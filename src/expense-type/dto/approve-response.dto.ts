/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ApproveDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'APPROVED / PENDING / REJECTED',
  })
  status: string;
}
