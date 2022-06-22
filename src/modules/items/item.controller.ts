import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemCreateInput } from './dto/item.create.dto';
import { ItemService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemGetSchema } from './swagger/GET/schemas/items.schema';
import { ItemsGetResponse } from './swagger/GET/items';
import { ItemsPostResponse } from './swagger/POST/items';
import { ItemsPatchResponse } from './swagger/PATCH/items';
import { ItemsDeleteResponse } from './swagger/DELETE/items';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { ItemUpdateInput } from './dto/item.update.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoles } from '../auth/constants/auth.constants';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiExtraModels(ItemGetSchema)
  @ApiOkResponse(ItemsGetResponse)
  async getItems(): Promise<Item[]> {
    return this.itemService.getItems();
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @ApiCreatedResponse(ItemsPostResponse)
  @UseInterceptors(FileInterceptor('cover'))
  async createItem(@Body() data: ItemCreateInput, @UploadedFile() file?: Express.Multer.File): Promise<Item> {
    if (file) {
      const buffer = file.buffer;
      const filename = file.originalname;
      return await this.itemService.createItem(data, buffer, filename);
    }
    return this.itemService.createItem(data);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @ApiOkResponse(ItemsPatchResponse)
  @UseInterceptors(FileInterceptor('cover'))
  async updateItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ItemUpdateInput,
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
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @ApiOkResponse(ItemsDeleteResponse)
  async deleteItem(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.itemService.deleteItem({ id });
  }
}
