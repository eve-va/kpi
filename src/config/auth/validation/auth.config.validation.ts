import { plainToClass, Type } from 'class-transformer';
import { IsDefined, ValidateNested, validateSync } from 'class-validator';
// import { ConfigMandatoryFieldError } from 'src/common/errors/configMandatoryField.error';
// import { configErrorMessageBuilder } from 'src/config/common/errorMessageBuilder';
import { IAuthConfig, IGoogleConfig } from '../interfaces/auth.config.interface';

class GoogleConfig implements Omit<IGoogleConfig, 'CALLBACK_URL'> {
  @IsDefined()
  GOOGLE_CLIENT_ID: string;

  @IsDefined()
  GOOGLE_SECRET: string;
}

class AuthConfig implements IAuthConfig {
  JWT: {
    JWT_SECRET: string;
    JWT_EXPIRATION_TIME: string;
  };

  REFRESH_JWT: {
    REFRESH_JWT_SECRET: string;
    REFRESH_JWT_EXPIRATION_TIME: string;
  };

  SESSION: {
    SESSION_SECRET: string;
  };

  @ValidateNested()
  @Type(() => GoogleConfig)
  GOOGLE: {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    CALLBACK_URL: string;
  };
  UTIL: {
    LEVERX_WHITELIST: boolean;
  };
}

export function validate(config: Record<string, unknown>): AuthConfig {
  const validatedConfig = plainToClass(AuthConfig, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  // if (errors.length) {
  //   throw new ConfigMandatoryFieldError('Auth', configErrorMessageBuilder(errors));
  // }
  return validatedConfig;
}
