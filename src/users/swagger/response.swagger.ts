import { ApiProperty } from '@nestjs/swagger';

export class UserResponseSwagger {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: 'john@mail.com',
  })
  email: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: string;
}
