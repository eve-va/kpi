import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { ReviewCreateInput } from '../reviews/dto/review.create.dto';
import { ReviewUpdateInput } from './dto/review.update.dto';
import { ReviewService } from './review.service';
import { ReviewsDeleteResponse } from './swagger/DELETE/reviews';
import { ReviewsPatchResponse } from './swagger/PATCH/reviews';
import { ReviewsPostResponse } from './swagger/POST/reviews';

@ApiTags('Review')
@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':itemId')
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse(ReviewsPostResponse)
  async createReview(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() data: ReviewCreateInput
  ): Promise<Review> {
    const reviewData = {
      itemId,
      ...data
    }
    return this.reviewService.createReview(reviewData);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOkResponse(ReviewsPatchResponse)
  async updateReview(
  @Param('id', ParseUUIDPipe) id: string,
  @Body() data: ReviewUpdateInput,
  ) {
  return await this.reviewService.updateReview({ id }, data);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOkResponse(ReviewsDeleteResponse)
  async deleteReview(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
  return await this.reviewService.deleteReview({ id });
  }
}
