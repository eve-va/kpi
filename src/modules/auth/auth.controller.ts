import { Body, Controller, Get, MisdirectedException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/localAuth.guard';
import CreateUserDto from '../users/dto/user.create.dto';
import LoginDto from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  public async googleAuth(): Promise<void> {
    throw new MisdirectedException();
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  public async googleAuthRedirect(@Req() req: Request): Promise<string> {
    if (!req.user) {
      //NoUserFromGoogleError
    }
    const accessToken = await this.authService.login(req.user);
    const refreshToken = await this.authService.getJwtRefreshToken(req.user);
    req.res?.setHeader('Set-Cookie', refreshToken);
    return accessToken;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refresh(@Req() req: Request): Promise<string> {
    if (!req.user) {
      //NoUserOnRequestObjectError
    }
    const accessToken = await this.authService.login(req.user);
    return accessToken;
  }

  @Post('signup')
  public async signup(
    @Req() req: Request,
    @Body() data: CreateUserDto,
  ): Promise<string> {
    if (!req.user) {
      //NoUserOnRequestObjectError
    }
    const accessToken = await this.authService.signup(data);
    return accessToken;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(
    @Req() req: Request,
    @Body() data: LoginDto,
  ): Promise<string> {
    if (!req.user) {
      //NoUserOnRequestObjectError
    }
    const accessToken = await this.authService.login(req.user);
    const refreshToken = await this.authService.getJwtRefreshToken(req.user);
    req.res?.setHeader('Set-Cookie', refreshToken);
    return accessToken;
  }

  @Post('logout')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request): Promise<void> {
    if (!req.user) {
      //NoUserOnRequestObjectError
    }
    const logOutCookie = await this.authService.logout(req.user);
    req.res?.setHeader('Set-Cookie', logOutCookie);
  }
}
