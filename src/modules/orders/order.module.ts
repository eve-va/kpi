import { Module } from 'src/common/decorators/module.decorator';
import { OrderRepositoryModule } from './repository/order.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [OrderRepositoryModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
