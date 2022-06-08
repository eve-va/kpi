export interface IAuthConfig {
  JWT: IJWTConfig;
  REFRESH_JWT: IRefreshJWTConfig;
  SESSION: ISession;
  GOOGLE: IGoogleConfig;
  UTIL: IAuthUtilConfig;
}

export interface IJWTConfig {
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
}

export interface IRefreshJWTConfig {
  REFRESH_JWT_SECRET: string;
  REFRESH_JWT_EXPIRATION_TIME: string;
}

export interface ISession {
  SESSION_SECRET: string;
}

export interface IGoogleConfig {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_SECRET: string;
  CALLBACK_URL: string;
}

export interface IAuthUtilConfig {
  LEVERX_WHITELIST: boolean;
}
