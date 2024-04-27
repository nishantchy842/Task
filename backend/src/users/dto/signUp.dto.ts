import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ default: 'nishant@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'nishant' })
  @IsString()
  username: string;

  @ApiProperty({ default: 'pass1234' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
