/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashInResponseDto {
  @ApiProperty({ example: 'Cash in created successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: '4d819a22-05d4-4964-a239-81c19faa1a6e',
      date: '2023-10-05T14:05:33.299Z',
      branch_id: 'bbecb8bf-4eaa-4767-86ed-51c3c8498223',
      approved_by: '4654897',
      amount: 2000,
      status: 'APPROVED / PENDING / REJECTED',
      comment: 'this is the comment for the cash in route',
      user_id: 'e866735e-c625-4446-8e0b-6983010f3ee2',
      approved_at: '2023-10-05T14:09:03.842Z',
      createdAt: '2023-10-05T14:05:33.299Z',
      updatedAt: '2023-10-05T14:09:03.851Z',
    },
    nullable: true,
  })
  data?: any;

  @ApiProperty({ example: null, nullable: true })
  errors?: { [key: string]: any };

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  status: number;
}
