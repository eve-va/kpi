import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemCreateInput } from './dto/item.create.dto';
import { ItemService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getSkills(): Promise<Item[]> {
    return this.itemService.getItems();
  }

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async createItem(@Body() data: ItemCreateInput, @UploadedFile() file?: Express.Multer.File,): Promise<Item> {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.itemService.createItem(data, buffer, filename);
    }
    return this.itemService.createItem(data);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('cover'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ItemCreateInput,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.itemService.updateItem(
        { id },
        data,
        buffer,
        filename,
      );
    }
    return await this.itemService.updateItem({ id }, data);
  }

  @Delete(':id')
  async deleteItem(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.itemService.deleteItem({ id });
  }
}
