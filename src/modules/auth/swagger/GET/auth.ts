import { ApiResponseOptions } from '@nestjs/swagger';

export const AuthGetLoginResponse: ApiResponseOptions = {
  description: 'Successful login',
  schema: {
    description: `Access token`,
    properties: {
      accessToken: { type: 'string' },
    },
  },
};

export const AuthGetRefreshResponse: ApiResponseOptions = {
  description: 'Refresh access token',
  schema: {
    description: `Access token`,
    properties: { accessToken: { type: 'string' } },
  },
};

export const NoUserOnRequestObject: ApiResponseOptions = {
  description: 'No user on request object',
};

export const RefreshTokenDoesNotMatch: ApiResponseOptions = {
  description: 'Refresh token does not match',
};

export const Unauthorized: ApiResponseOptions = {
  description: 'Unauthorized',
};
