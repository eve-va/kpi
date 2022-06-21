import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ItemRepositoryService } from './item.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [ItemRepositoryService],
  exports: [ItemRepositoryService],
})
export class ItemRepositoryModule {}
