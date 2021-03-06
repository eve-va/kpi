import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { ReviewCreateInput } from '../reviews/dto/review.create.dto';
import { ReviewUpdateInput } from './dto/review.update.dto';
import { ReviewRepositoryService } from './repository/review.repository.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepositoryService,
  ) {}

  public async getReviews(where: Prisma.ReviewWhereInput, limit?: number, offset?: number): Promise<Review[]> {
    return this.reviewRepository.getReviews(where, limit, offset);
  }

  public async createReview(data: ReviewCreateInput): Promise<Review> {
    return this.reviewRepository.createReview(data);
  }
  
  async updateReview(
    where: Prisma.ReviewWhereUniqueInput,
    data: ReviewUpdateInput
  ): Promise<Review> {
    return await this.reviewRepository.updateReview(where, data);
  }
  
  async deleteReview(where: Prisma.ReviewWhereUniqueInput): Promise<void> {
    await this.reviewRepository.deleteReview(where);
  }
}
