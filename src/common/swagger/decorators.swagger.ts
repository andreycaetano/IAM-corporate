import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  badRequestValidationSchema,
  unauthorizedContent,
} from './responses.swagger';

export const UnauthorizedResponse = () =>
  ApiUnauthorizedResponse({
    description: 'Authorization token invalid or missing',
    content: unauthorizedContent,
  });

export const BadRequestResponse = () =>
  ApiBadRequestResponse({
    description: 'Input data validation error.',
    schema: badRequestValidationSchema,
  });

export const NotFoundResponse = (content: string) =>
  ApiNotFoundResponse({
    description: 'Not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: `${content} com o ID 123e4567-e89b-12d3-a456-426614174000 não encontrado`,
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  });
