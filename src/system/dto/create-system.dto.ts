import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSystemDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'name deve ser uma string' })
  @IsNotEmpty({ message: 'name é obrigatório' })
  name: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsString({ message: 'description deve ser uma string' })
  description?: string;
}
