import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderRepositoryService } from './repository/order.repository.service';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepositoryService) {}

  public async getOrders(): Promise<Order[]> {
    return this.orderRepository.getOrders();
  }
}
