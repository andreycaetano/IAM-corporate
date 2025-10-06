import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString({ message: 'name deve ser uma string' })
  @IsNotEmpty({ message: 'name é obrigatório' })
  name: string;

  @ApiProperty({
    example: 'john@mail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email é obrigatório' })
  email: string;
}
