import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Item } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ItemData } from './data/item.data';

@Injectable()
export class ItemSeederService {
  private logger = new Logger('ItemSeeder');

  constructor(private readonly prisma: PrismaService) {}

  public async seed(): Promise<(Item | void)[]> {
    return Promise.all(
      ItemData.map(async (data: Prisma.ItemCreateInput) => {
        return this.prisma.item.create({ data }).catch(() => {
          this.logger.error(`Item ${data.title} by ${data.author} already exists`);
        });
      }),
    );
  }
}
