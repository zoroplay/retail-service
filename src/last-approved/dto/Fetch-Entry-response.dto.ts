/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class FetchEntryResponseDto {
  @ApiProperty({ example: 'user created successfully' })
  message: string;

  @ApiProperty({
    example: {
      email: 'test@denrox.com',
      first_name: 'Sample',
      last_name: 'User',
      username: '0703123456789',
      id: '5d987c3bfb881ec86b476bcc',
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
