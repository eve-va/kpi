import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seederSerice = appContext.get(SeederService);
  await seederSerice.seed();
  appContext.close();
}

bootstrap();
