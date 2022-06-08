import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJWTConfig } from "src/config/auth/interfaces/auth.config.interface";
import { UserService } from "src/modules/users/user.service";
import LoginDto from "../dto/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(configService: ConfigService, private userService: UserService) {
    const { JWT_SECRET } = configService.get<IJWTConfig>('JWT') as IJWTConfig;
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    });
  }

  public async validate(data: LoginDto): Promise<User> {
  //public async validate(email: string, password:string): Promise<User> {
    return this.userService.getUserIfPasswordMatches(data.email, data.password);
  }
}