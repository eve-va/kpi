import { Injectable } from '@nestjs/common';
import { Prisma, Image } from '@prisma/client';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class ImageRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async findImage(where: Prisma.ImageWhereUniqueInput): Promise<Image> {
    return this.prisma.image.findUnique({ where });
  }

  public async createImage(data: Prisma.ImageCreateInput): Promise<Image> {
    return this.prisma.image.create({ data });
  }

  public async deleteImage(where: Prisma.ImageWhereUniqueInput): Promise<void> {
    await this.prisma.image.delete({ where });
  }
}
