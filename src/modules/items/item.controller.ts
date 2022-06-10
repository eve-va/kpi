import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Item, Review } from '@prisma/client';
import { ItemCreateInput } from './dto/item.create.dto';
import { ItemService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReviewCreateInput } from './dto/review.create.dto';

@Controller('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getItems(): Promise<Item[]> {
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
  async updateItem(
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

  //item or user id
  @Get(':id')
  async getReviews(@Param('id', ParseUUIDPipe) id: string): Promise<Review[]> {
    return this.itemService.getReviews({ id });
  }

  //user decorator
  // @Post(':itemId')
  // async createReview(
  //   @Param('itemId', ParseUUIDPipe) itemId: string,
  //   @Body() data: ReviewCreateInput
  // ): Promise<Review> {
  //   const reviewData = {
  //     itemId,
  //     ...data
  //   }
  //   return this.itemService.createReview(reviewData);
  // }

  //perhaps separate module
  @Patch(':reviewId')
  async updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ReviewCreateInput,
  ) {
    return await this.itemService.updateReview({ id }, data);
  }

  //sm
  @Delete(':reviewId')
  async deleteReview(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.itemService.deleteReview({ id });
  }
}
