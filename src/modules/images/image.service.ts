import { Injectable } from '@nestjs/common';
import { ImageRepositoryService } from './repository/image.repository.service';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Image, Prisma } from '@prisma/client';

@Injectable()
export class ImageService {
  private AWS_PUBLIC_BUCKET_NAME: string;

  constructor(
    private imageRepository: ImageRepositoryService,
    private configService: ConfigService,
  ) {
    this.AWS_PUBLIC_BUCKET_NAME = this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME');
  }

  async uploadImage(dataBuffer: Buffer, filename: string): Promise<Image> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = await this.imageRepository.createImage({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    console.log('file' + newFile);
    return newFile;
  }

  async deleteImage(where: Prisma.ImageWhereUniqueInput): Promise<void> {
    const file = await this.imageRepository.findImage(where);
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.AWS_PUBLIC_BUCKET_NAME,
        Key: file.key,
      })
      .promise();
    return await this.imageRepository.deleteImage(where);
  }
}
