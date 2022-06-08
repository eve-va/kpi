import { Controller, Get } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderService } from './order.service';

@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getSkills(): Promise<Order[]> {
    return this.orderService.getOrders();
  }
}
