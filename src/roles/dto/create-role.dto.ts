import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString({ message: 'name deve ser uma string' })
  @IsNotEmpty({ message: 'name é obrigatório' })
  name: string;

  @ApiPropertyOptional()
  @IsString({ message: 'description deve ser uma string' })
  description?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'systemId é obrigatório' })
  systemId: string;
}
