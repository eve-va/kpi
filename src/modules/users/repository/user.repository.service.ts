import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where });
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = this.prisma.user.create({ data });
    return user;
  }

  public async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where,
      data,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}
