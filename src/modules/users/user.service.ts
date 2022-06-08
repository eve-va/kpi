import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepositoryService } from './repository/user.repository.service';
import CreateUserDto from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  public async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(data);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      //UserNotFoundError
    }
    return user;
  }

  
  // public async getAuthenticatedUser(email: string, hashedPassword: string) {
  //   try {
  //     const user = await this.usersService.getByEmail(email);
  //     const isPasswordMatching = await bcrypt.compare(
  //       hashedPassword,
  //       user.password
  //     );
  //     if (!isPasswordMatching) {
  //       throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  //     }
  //     user.password = undefined;
  //     return user;
  //   } catch (error) {
  //     throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  //   }
  // }

  async getUserIfPasswordMatches(email: string, hashedPassword: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      //WrongCredentialsError
    }
    const isPasswordMatching = await bcrypt.compare(
      hashedPassword,
      user.password
    );
    if (!isPasswordMatching) {
      //WrongCredentialsError
    }
    user.password = undefined;
    return user;
  }

  async getUserIfRefreshTokenMatches(email: string, refreshToken: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      //UserNotFoundError
    }

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user?.hashedRefreshToken as string);
    if (!isRefreshTokenMatching) {
      //RefreshTokenDoesNotMatchError
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
