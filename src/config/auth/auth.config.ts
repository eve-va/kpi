import { validate } from './validation/auth.config.validation';
import { IAuthConfig } from './interfaces/auth.config.interface';

export const AuthConfig = (): IAuthConfig => {
  return validate({
    JWT: {
      JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
      JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '3600s',
    },
    REFRESH_JWT: {
      REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET || 'jwt_secret',
      REFRESH_JWT_EXPIRATION_TIME: process.env.REFRESH_JWT_EXPIRATION_TIME || '86400s',
    },
    GOOGLE: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET as string,
      CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:3000/api/auth/redirect',
    },
    UTIL: {
      LEVERX_WHITELIST: process.env.LEVERX_WHITELIST === 'true',
    },
    SESSION: {
      SESSION_SECRET: process.env.SESSION_SECRET || 'session_secret',
    },
  });
};
