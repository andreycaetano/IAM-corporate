import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBody {
  @ApiProperty({
    example: 'user@email.com',
    description: 'O e-mail do usuário para autenticação.',
  })
  @IsString({ message: 'email deve ser uma string' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'A senha do usuário.',
    type: 'string',
    format: 'password',
  })
  @IsString({ message: 'password deve ser uma string' })
  @IsNotEmpty({ message: 'password é obrigatório' })
  password: string;
}
