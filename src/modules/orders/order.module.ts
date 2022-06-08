import { Module } from '@nestjs/common';
import { OrderRepositoryModule } from './repository/order.repository.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [OrderRepositoryModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
