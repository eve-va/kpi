import { Body, Controller, Get, Post } from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemCreateInput } from './dto/item.create.dto';
import { ItemService } from './item.service';

@Controller('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getSkills(): Promise<Item[]> {
    return this.itemService.getItems();
  }

  @Post()
  async createItem(@Body() data: ItemCreateInput): Promise<Item> {
    return this.itemService.createItem(data);
  }
}
