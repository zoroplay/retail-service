import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExpenseCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'category',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'description',
  })
  description: string;
}
