/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '65982d2e-20ae-4bba-a073-f470b49514c6',
  })
  expense_type_id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'e866735e-c625-4446-8e0b-6983010f3ee2',
  })
  branch_id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '68e73e8c-e9d3-4b58-9488-7109cc15958d',
  })
  user_id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 2,
  })
  amount: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'tell me something about',
  })
  comment: string;
}
