/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateExpenseTypeDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'tell me something about',
  })
  title: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    example: 450,
  })
  amount: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    example: 8910,
  })
  fixed: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'e866735e-c625-4446-8e0b-6983010f3ee2',
  })
  category_id: string;
}
