import { Module } from '@nestjs/common';
import { ImageRepositoryModule } from './repository/image.repository.module';
import { ImageService } from './image.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ImageRepositoryModule, ConfigModule],
  controllers: [],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
