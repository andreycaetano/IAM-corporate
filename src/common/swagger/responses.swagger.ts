export const unauthorizedContent = {
  'application/json': {
    examples: {
      tokenAusente: {
        value: {
          statusCode: 401,
          message: 'Token ausente',
          error: 'Unauthorized',
        },
      },
      tokenInvalido: {
        value: {
          statusCode: 401,
          message: 'Token inválido',
          error: 'Unauthorized',
        },
      },
    },
  },
};

export const badRequestValidationSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: 400 },
    message: {
      type: 'array',
      items: { type: 'string' },
      example: [
        'O name é obrigatório ',
        'O name deve ser uma string ',
        'email must be an email',
      ],
    },
    error: { example: 'Bad Request' },
  },
};
