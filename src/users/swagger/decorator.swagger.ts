import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserResponseSwagger } from './response.swagger';
import {
  BadRequestResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '@/common/swagger/decorators.swagger';

export const SwaggerUserCreate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiCreatedResponse({
      description: 'The record has been successfully created.',
      type: UserResponseSwagger,
    }),
    UnauthorizedResponse(),
    BadRequestResponse(),
  );

export const SwaggerUserFindAll = () =>
  applyDecorators(
    ApiOperation({ summary: 'Find all users' }),
    ApiOkResponse({
      description: 'The record has been successfully created.',
      type: [UserResponseSwagger],
    }),
    UnauthorizedResponse(),
  );

export const SwaggerUserFindOne = () =>
  applyDecorators(
    ApiOperation({ summary: 'Find all users' }),
    ApiOkResponse({
      description: 'The record has been successfully created.',
      type: UserResponseSwagger,
    }),
    NotFoundResponse('user'),
    UnauthorizedResponse(),
  );

export const SwaggerUserUpdate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Find all users' }),
    ApiOkResponse({
      description: 'The record has been successfully created.',
      type: UserResponseSwagger,
    }),
    NotFoundResponse('user'),
    UnauthorizedResponse(),
    BadRequestResponse(),
  );

export const SwaggerUserDelete = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete users' }),
    ApiNoContentResponse({
      description: 'The record has been successfully created.',
    }),
    NotFoundResponse('user'),
    UnauthorizedResponse(),
  );
