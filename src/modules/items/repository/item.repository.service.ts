import { Injectable } from '@nestjs/common';
import { Prisma, Item } from '@prisma/client';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class ItemRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getItems(
    where?: Prisma.ItemWhereInput,
    limit?: number,
    offset = 0,
  ): Promise<Item[]> {
    return this.prisma.item.findMany({
      where,
      skip: offset,
      take: limit,
    });
  }

  public async createItem(data: Prisma.ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({ data });
  }
}
