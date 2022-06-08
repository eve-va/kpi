import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma/prisma.module';
import { OrderRepositoryService } from './order.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [OrderRepositoryService],
  exports: [OrderRepositoryService],
})
export class OrderRepositoryModule {}
