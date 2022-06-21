import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ImageRepositoryService } from './image.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [ImageRepositoryService],
  exports: [ImageRepositoryService],
})
export class ImageRepositoryModule {}
