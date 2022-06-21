import { Module } from "@nestjs/common";
import { ItemSeederModule } from "./item/item.seeder.module";
import { SeederService } from "./seeder.service";

@Module({
  imports: [ItemSeederModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
