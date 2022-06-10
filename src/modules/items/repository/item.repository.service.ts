import { Injectable } from '@nestjs/common';
import { Prisma, Item, Review } from '@prisma/client';
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

  public async getItem(where: Prisma.ItemWhereUniqueInput): Promise<Item> {
    return this.prisma.item.findUnique({ where });
  }

  public async createItem(data: Prisma.ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({ data });
  }

  public async updateItem(where: Prisma.ItemWhereUniqueInput, data: Prisma.ItemUpdateInput): Promise<Item> {
    return this.prisma.item.update({
      where,
      data,
    });
  }
  
  public async deleteItem(where: Prisma.ItemWhereUniqueInput): Promise<void> {
    await this.prisma.item.delete({ where });
  }

  public async getReviews(
    where?: Prisma.ReviewWhereInput,
    limit?: number,
    offset = 0,
  ): Promise<Review[]> {
    return this.prisma.review.findMany({
      where,
      skip: offset,
      take: limit,
    });
  }

  public async getReview(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.prisma.review.findUnique({ where });
  }

  public async createReview(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({ data });
  }

  public async updateReview(where: Prisma.ReviewWhereUniqueInput, data: Prisma.ReviewUpdateInput): Promise<Review> {
    return this.prisma.review.update({
      where,
      data,
    });
  }
  
  public async deleteReview(where: Prisma.ReviewWhereUniqueInput): Promise<void> {
    await this.prisma.review.delete({ where });
  }
}
