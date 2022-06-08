import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JWTPayload } from '../interfaces/jwtPayload.interface';
import { UserService } from 'src/modules/users/user.service';
import { IRefreshJWTConfig } from 'src/config/auth/interfaces/auth.config.interface';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(configService: ConfigService, private userService: UserService) {
    const { REFRESH_JWT_SECRET } = configService.get<IRefreshJWTConfig>('REFRESH_JWT') as IRefreshJWTConfig;
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.Refresh;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: REFRESH_JWT_SECRET,
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, payload: JWTPayload): Promise<JWTPayload> {
    const refreshToken = request.cookies.Refresh;
    const validatedUser = await this.userService.getUserIfRefreshTokenMatches(payload.email, refreshToken);
    return {
      id: validatedUser.id,
      firstName: validatedUser.firstName as string,
      lastName: validatedUser.lastName as string,
      email: validatedUser.email,
      roles: validatedUser.roles as string[],
    };
  }
}
