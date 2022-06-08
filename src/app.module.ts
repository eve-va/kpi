import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ItemModule } from "./modules/items/item.module";
import { OrderModule } from "./modules/orders/order.module";
import { UserModule } from "./modules/users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    OrderModule,
    ItemModule
  ]
})

export class AppModule {}
