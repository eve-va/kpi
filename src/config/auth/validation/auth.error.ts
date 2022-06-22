export class ConfigMandatoryFieldError extends Error {
    constructor(property: string) {
      super(`${property} validation failed. One of the required values was not found`);
      this.name = 'ConfigMandatoryFieldError';
    }
} 