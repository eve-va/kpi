import { Injectable } from '@nestjs/common';
import { Item, Prisma, Review } from '@prisma/client';
import { ImageService } from 'src/modules/images/image.service';
import { ItemCreateInput } from './dto/item.create.dto';
import { ReviewCreateInput } from './dto/review.create.dto';
import { ItemRepositoryService } from './repository/item.repository.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepositoryService,
    private readonly imageService: ImageService,
  ) {}

  public async getItems(where?: Prisma.ItemWhereInput, limit?: number, offset?: number): Promise<Item[]> {
    return this.itemRepository.getItems(where, limit, offset);
  }

  public async createItem(data: ItemCreateInput, buffer?: Buffer, filename?: string,): Promise<Item> {
  if (filename) {
    const cover = await this.imageService.uploadImage(buffer, filename);
    const recordWithCover = {
      cover: cover.id,
      ...data,
    };
    this.itemRepository.createItem(recordWithCover);
  }
    return this.itemRepository.createItem(data);
  }

  async updateItem(
    where: Prisma.ItemWhereUniqueInput,
    data: ItemCreateInput,
    buffer?: Buffer,
    filename?: string,
  ): Promise<Item> {
    if (filename) {
      const cover = await this.imageService.uploadImage(buffer, filename);
      return await this.itemRepository.updateItem(where, {
        cover: cover.id,
        ...data,
      });
    }
    return await this.itemRepository.updateItem(where, data);
  }

  async deleteItem(where: Prisma.ItemWhereUniqueInput): Promise<void> {
    const item = await this.itemRepository.getItem(where);
    const id = item.cover;
    await this.itemRepository.deleteItem(where);
    if (id) {
      await this.imageService.deleteImage({ id });
    }
  }

  public async getReviews(where?: Prisma.ReviewWhereInput, limit?: number, offset?: number): Promise<Review[]> {
    return this.itemRepository.getReviews(where, limit, offset);
  }

  public async createReview(data: ReviewCreateInput): Promise<Review> {
    return this.itemRepository.createReview(data);
  }

  async updateReview(
    where: Prisma.ReviewWhereUniqueInput,
    data: ReviewCreateInput
  ): Promise<Review> {
    return await this.itemRepository.updateReview(where, data);
  }

  async deleteReview(where: Prisma.ReviewWhereUniqueInput): Promise<void> {
    await this.itemRepository.deleteReview(where);
  }
}
