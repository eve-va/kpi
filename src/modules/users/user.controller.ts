import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './User.service';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getSkills(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
