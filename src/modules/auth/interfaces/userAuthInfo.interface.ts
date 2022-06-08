export interface UserAuthInfo {
  firstName: string;
  lastName: string;
  email: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserAuthInfo;
  }
}
