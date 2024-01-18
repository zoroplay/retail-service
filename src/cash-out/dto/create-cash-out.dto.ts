import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCashOutDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '65982d2e-20ae-4bba-a073-f470b49514c6',
  })
  branch_id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 780,
  })
  amount: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'tell me something about',
  })
  comment: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '65982d2e-20ae-4bba-a073-f470b49514c6',
  })
  user_id: string;
}
