import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ForgotPasswordDto } from '@/auth/dtos/forgot-password.dto';
import { LoginRequestBody } from '@/auth/models/login-request-body.model';
import {
  BadRequestResponse,
  UnauthorizedResponse,
} from '@/common/swagger/decorators.swagger';

export const ApiUnauthorizedStd = () => UnauthorizedResponse();

export const ApiBadRequestValidation = () => BadRequestResponse();

export const SwaggerAuthLogin = () =>
  applyDecorators(
    ApiOperation({ summary: 'Authentication user' }),
    ApiBody({ type: LoginRequestBody }),
    ApiOkResponse({
      description: 'User authenticated successfully',
      schema: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'authenticated failed',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Email ou senha estão incorretos!',
          },
          error: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: 409,
          },
        },
      },
    }),
    ApiBadRequestValidation(),
  );

export const SwaggerAuthForgotPassword = () =>
  applyDecorators(
    ApiOperation({ summary: 'Request password reset via email' }),
    ApiBody({ type: ForgotPasswordDto }),
    ApiOkResponse({
      description: 'Password reset email sent successfully',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Email de recuperação de senha enviado com sucesso!',
          },
        },
      },
    }),
    ApiBadRequestValidation(),
  );

export const SwaggerAuthCheckToken = () =>
  applyDecorators(
    ApiOperation({ summary: 'Check if the token is valid' }),
    ApiOkResponse({
      description: 'Check token successfully',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '1e32498f-49ca-4848-b6b8-f80cff0a4697',
          },
          email: {
            type: 'string',
            example: 'john@mail.com',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          role: {
            type: 'string',
            example: 'admin',
          },
        },
      },
    }),
    ApiUnauthorizedStd(),
  );
