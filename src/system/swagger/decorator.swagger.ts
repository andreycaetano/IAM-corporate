import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SystemResponseSwagger } from '@/system/swagger/response.swagger';
import { UnauthorizedResponse } from '@/common/swagger/decorators.swagger';

export const SwaggerSystemCreate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new System' }),
    ApiCreatedResponse({
      description: 'The record has been successfully created.',
      type: SystemResponseSwagger,
    }),
    UnauthorizedResponse(),
  );

export const SwaggerSystemFindAll = () =>
  applyDecorators(
    ApiOperation({ summary: 'Find all Systems' }),
    ApiOkResponse({
      description: 'The record has been successfully created.',
      type: [SystemResponseSwagger],
    }),
    UnauthorizedResponse(),
  );

export const SwaggerSystemFindOne = () =>
  applyDecorators(
    ApiOperation({ summary: 'Find one Systems' }),
    ApiOkResponse({
      description: 'The record has been successfully created.',
      type: SystemResponseSwagger,
    }),
    UnauthorizedResponse(),
  );

export const SwaggerSystemUpdate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a System' }),
    ApiOkResponse({
      description: 'The record has been successfully created.',
      type: SystemResponseSwagger,
    }),
    UnauthorizedResponse(),
  );

export const SwaggerSystemDelete = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a System' }),
    ApiOkResponse({
      description: 'The record has been successfully created.',
    }),
    UnauthorizedResponse(),
  );
