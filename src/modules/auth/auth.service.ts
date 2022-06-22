import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IRefreshJWTConfig } from 'src/config/auth/interfaces/auth.config.interface';
import CreateUserDto from '../users/dto/user.create.dto';
import { UserAlreadyExistsError } from '../users/errors/user.error';
import { UserService } from '../users/user.service';
import { JWTPayload } from './interfaces/jwtPayload.interface';
import { UserAuthInfo } from './interfaces/userAuthInfo.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService, 
    private configService: ConfigService
  ) {}

  public async signup(data: CreateUserDto): Promise<string> {
    const createdUser = await this.userService.createUser(data);
    if (!createdUser) {
      throw new UserAlreadyExistsError('email', data.email);
    }

    const payload: JWTPayload = {
      id: createdUser.id,
      firstName: createdUser.firstName as string,
      lastName: createdUser.lastName as string,
      email: createdUser.email,
      roles: createdUser.roles as string[],
    };

    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  public async login(user: UserAuthInfo): Promise<string> {
    const payload = await this.getUserAndFormPayload(user.email);
    if (!payload) {
      return this.signup(user);
    }
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  public async getJwtRefreshToken(user: UserAuthInfo): Promise<string> {
    const { REFRESH_JWT_SECRET, REFRESH_JWT_EXPIRATION_TIME } = this.configService.get<IRefreshJWTConfig>(
      'REFRESH_JWT',
    ) as IRefreshJWTConfig;

    const payload = await this.getUserAndFormPayload(user.email);
    const refreshToken = this.jwtService.sign(payload, {
      secret: REFRESH_JWT_SECRET,
      expiresIn: REFRESH_JWT_EXPIRATION_TIME,
    });

    await this.userService.setRefreshToken({ id: payload.id }, refreshToken);
    return `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${REFRESH_JWT_EXPIRATION_TIME}`;
  }

  private async getUserAndFormPayload(email: string): Promise<JWTPayload> {
    const userFetched = await this.userService.findByEmail(email);
    if (!userFetched) { 
      return null;
    }

    const payload: JWTPayload = {
      id: userFetched.id,
      firstName: userFetched.firstName as string,
      lastName: userFetched.lastName as string,
      email: userFetched.email,
      roles: userFetched.roles as string[],
    };
    return payload;
  }

  public async logout(user: UserAuthInfo): Promise<string[]> {
    await this.userService.removeRefreshToken({ email: user.email });
    return ['Refresh=; HttpOnly; Path=/; Max-Age=0'];
  }
}
