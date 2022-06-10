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
    this.AWS_PUBLIC_BUCKET_NAME = this.configService.get<string>('AWS');
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


//   public async getUsers(): Promise<User[]> {
//     return this.userRepository.getUsers();
//   }

//   public async createUser(data: CreateUserDto): Promise<User> {
//     return this.userRepository.createUser(data);
//   }

//   async findByEmail(email: string): Promise<User> {
//     const user = await this.userRepository.findByEmail(email);
//     if (!user) {
//       //UserNotFoundError
//     }
//     return user;
//   }

//   async getUserIfPasswordMatches(email: string, hashedPassword: string): Promise<User> {
//     const user = await this.userRepository.findByEmail(email);
//     if (!user) {
//       //WrongCredentialsError
//     }
//     const isPasswordMatching = await bcrypt.compare(
//       hashedPassword,
//       user.password
//     );
//     if (!isPasswordMatching) {
//       //WrongCredentialsError
//     }
//     user.password = undefined;
//     return user;
//   }

//   async getUserIfRefreshTokenMatches(email: string, refreshToken: string): Promise<User> {
//     const user = await this.userRepository.findByEmail(email);
//     if (!user) {
//       //UserNotFoundError
//     }

//     const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user?.hashedRefreshToken as string);
//     if (!isRefreshTokenMatching) {
//       //RefreshTokenDoesNotMatchError
//     }
//     return user;
//   }

//   async setRefreshToken(where: Prisma.UserWhereUniqueInput, refreshToken: string): Promise<User> {
//     const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
//     return this.userRepository.update(where, {
//       hashedRefreshToken,
//     });
//   }

//   async removeRefreshToken(where: Prisma.UserWhereUniqueInput): Promise<User> {
//     return this.userRepository.update(where, {
//       hashedRefreshToken: null,
//     });
//   }
}






//   }
// }