import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUsers(
    where?: Prisma.UserWhereInput,
    limit?: number,
    offset = 0,
  ): Promise<User[]> {
    return this.prisma.user.findMany({
      where,
      skip: offset,
      take: limit,
    });
  }
}
