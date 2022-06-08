import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwtRefresh.strategy';
import { UserModule } from 'src/modules/users/user.module';
import { AuthConfig } from 'src/config/auth/auth.config';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [ConfigModule.forFeature(AuthConfig), UserModule],
  providers: [GoogleStrategy, JwtStrategy, JwtRefreshTokenStrategy, LocalStrategy],
  exports: [GoogleStrategy, JwtStrategy, JwtRefreshTokenStrategy, LocalStrategy],
})
export class StrategiesModule {}
