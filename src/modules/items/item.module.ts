import { Module } from '@nestjs/common';
import { ItemRepositoryModule } from './repository/item.repository.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ImageModule } from '../images/image.module';

@Module({
  imports: [ItemRepositoryModule, ImageModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
