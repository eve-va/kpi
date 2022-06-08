import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemCreateInput } from './dto/item.create.dto';
import { ItemRepositoryService } from './repository/item.repository.service';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepositoryService) {}

  public async createItem(data: ItemCreateInput): Promise<Item> {
    return this.itemRepository.createItem(data);
  }

  public async getItems(): Promise<Item[]> {
    return this.itemRepository.getItems();
  }
}
