import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ReviewRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getReviews(
    where: Prisma.ReviewWhereInput,
    limit?: number,
    offset = 0,
  ): Promise<Review[]> {
    return this.prisma.review.findMany({
      where,
      skip: offset,
      take: limit,
    });
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