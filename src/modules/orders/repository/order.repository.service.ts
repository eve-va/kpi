import { Injectable } from '@nestjs/common';
import { Prisma, Order } from '@prisma/client';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class OrderRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getOrders(
    where?: Prisma.OrderWhereInput,
    limit?: number,
    offset = 0,
  ): Promise<Order[]> {
    return this.prisma.order.findMany({
      where,
      skip: offset,
      take: limit,
    });
  }
}
