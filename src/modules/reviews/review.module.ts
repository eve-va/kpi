import { Module } from '@nestjs/common';
import { ReviewRepositoryModule } from './repository/review.repository.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [ReviewRepositoryModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
