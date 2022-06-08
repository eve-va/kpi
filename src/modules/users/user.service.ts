import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepositoryService } from './repository/user.repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
}
