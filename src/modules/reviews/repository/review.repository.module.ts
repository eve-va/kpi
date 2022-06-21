import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ReviewRepositoryService } from './review.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [ReviewRepositoryService],
  exports: [ReviewRepositoryService],
})
export class ReviewRepositoryModule {}
