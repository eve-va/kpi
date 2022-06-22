import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepositoryService } from './repository/user.repository.service';
import CreateUserDto from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDoesNotMatchError, UserNotFoundError } from './errors/user.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  public async getUser(id: string): Promise<User> {
    return this.userRepository.getUser({ id });
  }

  public async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(data);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError('email', email);
    }
    return user;
  }

  async getUserIfRefreshTokenMatches(email: string, refreshToken: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError('email', email);
    }

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user?.hashedRefreshToken as string);
    if (!isRefreshTokenMatching) {
      throw new RefreshTokenDoesNotMatchError('email', email);
    }
    return user;
  }

  async setRefreshToken(where: Prisma.UserWhereUniqueInput, refreshToken: string): Promise<User> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.userRepository.update(where, {
      hashedRefreshToken,
    });
  }

  async removeRefreshToken(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.userRepository.update(where, {
      hashedRefreshToken: null,
    });
  }
}
