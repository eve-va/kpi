import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getUser(id);
  }  
}
