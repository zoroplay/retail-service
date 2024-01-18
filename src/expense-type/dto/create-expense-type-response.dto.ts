/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseTypeResponseDto {
  @ApiProperty({ example: 'currency created successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: 'eb08ec8a-949b-4136-a001-885cb15308bd',
      title: 'The Title',
      amount: 5000,
      status: 'PENDING/REJECTED/APPROVED',
      fixed: 1,
      category_id: '68e73e8c-e9d3-4b58-9488-7109cc15958d',
      createdAt: '2023-10-05T13:19:54.947Z',
      updatedAt: '2023-10-05T13:19:54.947Z',
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
