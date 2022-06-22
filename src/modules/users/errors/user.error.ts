export class UserNotFoundError extends Error {
    constructor(property: string, value: string) {
      super(`The user searched for with ${property} = ${value} was not found`);
      this.name = 'UserNotFoundError';
    }
} 

export class UserAlreadyExistsError extends Error {
    constructor(property: string, value: string) {
      super(`The user with ${property} = ${value} already exists`);
      this.name = 'UserAlreadyExistsError';
    }
} 

export class RefreshTokenDoesNotMatchError extends Error {
    constructor(property: string, value: string) {
      super(`The refresh token for user with ${property} = ${value} does not match`);
      this.name = 'RefreshTokenDoesNotMatch';
    }
}
  