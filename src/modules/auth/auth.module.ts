import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { StrategiesModule } from './strategies/strategies.module';
import { AuthConfig } from 'src/config/auth/auth.config';
import { IJWTConfig } from 'src/config/auth/interfaces/auth.config.interface';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forFeature(AuthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(AuthConfig)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { JWT_SECRET, JWT_EXPIRATION_TIME } = configService.get<IJWTConfig>('JWT') as IJWTConfig;
        return {
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: JWT_EXPIRATION_TIME,
          },
        };
      },
    }),
    UserModule,
    StrategiesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
