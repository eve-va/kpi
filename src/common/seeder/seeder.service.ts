import { Injectable } from "@nestjs/common";
import { ItemSeederService } from "./item/item.seeder.service";

@Injectable()
export class SeederService {
  constructor(private readonly itemsSeeder: ItemSeederService) {}

  async seed(): Promise<void> {
    await this.itemsSeeder.seed();
  }
}
