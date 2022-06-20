import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

(async (): Promise<void> => {
  const application: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = application.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  application.useGlobalPipes(new ValidationPipe());
  application.use(cookieParser());

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('BookSite')
    .setDescription('Book Site')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(application, config);
  SwaggerModule.setup('api/docs', application, document);

  await application.listen(port);
})();
