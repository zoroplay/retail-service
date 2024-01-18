/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseCategoryResponseDto {
  @ApiProperty({ example: 'Expense Category created successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: '68e73e8c-e9d3-4b58-9488-7109cc15958d',
      title: 'The Title',
      description: 'The description',
      createdAt: '2023-10-05T13:17:59.717Z',
      updatedAt: '2023-10-05T13:17:59.717Z',
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
