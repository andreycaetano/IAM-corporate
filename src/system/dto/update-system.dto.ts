import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSystemDto {
  @ApiPropertyOptional({
    type: 'string',
  })
  @IsString({ message: 'name deve ser uma string' })
  name?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsString({ message: 'description deve ser uma string' })
  description?: string;
}
