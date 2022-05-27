import { Module } from 'src/common/decorators/module.decorator';
import { ItemRepositoryModule } from './repository/item.repository';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [ItemRepositoryModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
