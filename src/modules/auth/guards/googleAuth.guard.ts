import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GuardTypes } from '../constants/auth.constants';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(GuardTypes.GOOGLE) {}
