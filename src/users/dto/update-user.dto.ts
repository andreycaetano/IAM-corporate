import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString({ message: 'name deve ser uma string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'john@mail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}
