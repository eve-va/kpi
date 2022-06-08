import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { GoogleProfile } from '../interfaces/googleProfile.interface';
import { Injectable } from '@nestjs/common';
import { IGoogleConfig } from 'src/config/auth/interfaces/auth.config.interface';
import { UserAuthInfo } from '../interfaces/userAuthInfo.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const { GOOGLE_CLIENT_ID, GOOGLE_SECRET, CALLBACK_URL } = configService.get<IGoogleConfig>(
      'GOOGLE',
    ) as IGoogleConfig;
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<void> {
    const {
      _json: { email, given_name, family_name },
    } = profile;
    const user: UserAuthInfo = {
      email,
      firstName: given_name,
      lastName: family_name,
    };

    done(null, user);
  }
}
