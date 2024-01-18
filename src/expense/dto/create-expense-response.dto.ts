/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseResponseDto {
  @ApiProperty({ example: 'Expense created successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: '8f705850-bc39-4cb0-bed2-77784f3bb1b9',
      date: '2023-10-05T13:43:35.940Z',
      expense_type_id: 'e866735e-c625-4446-8e0b-6983010f3ee2',
      branch_id: '68e73e8c-e9d3-4b58-9488-7109cc15958d',
      user_id: 'e866735e-c625-4446-8e0b-6983010f3ee2',
      approved_by: null,
      approved_at: null,
      status: 'APPROVED / PENDING / REJECTED',
      amount: 5000,
      comment: 'The comment herr is nice',
      createdAt: '2023-10-05T13:43:35.940Z',
      updatedAt: '2023-10-05T13:43:35.940Z',
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
