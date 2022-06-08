import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma/prisma.module';
import { ItemRepositoryService } from './item.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [ItemRepositoryService],
  exports: [ItemRepositoryService],
})
export class ItemRepositoryModule {}
