import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ItemSeederService } from './item.seeder.service';

@Module({
  imports: [PrismaModule],
  providers: [ItemSeederService],
  exports: [ItemSeederService],
})
export class ItemSeederModule {}
