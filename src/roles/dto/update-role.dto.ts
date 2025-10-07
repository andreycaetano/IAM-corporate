import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional()
  @IsString({ message: 'name deve ser uma string' })
  name?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'description deve ser uma string' })
  description?: string;
}
