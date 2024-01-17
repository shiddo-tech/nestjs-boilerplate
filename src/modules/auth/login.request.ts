import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    required: true,
  })
  username: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
  })
  client_id: string;

  @ApiProperty({
    required: true,
  })
  client_secret: string;

  @ApiProperty({
    required: true,
  })
  grant_type: string;
}
