import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../interfaces/jwtPayload.interface';
import { IJWTConfig } from 'src/config/auth/interfaces/auth.config.interface';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const { JWT_SECRET } = configService.get<IJWTConfig>('JWT') as IJWTConfig;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  public async validate(payload: JWTPayload): Promise<JWTPayload> {
    return {
      id: payload.id,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      email: payload.email,
      roles: payload.roles as string[],
    };
  }
}
