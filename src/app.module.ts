import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { ItemModule } from "./modules/items/item.module";
import { UserModule } from "./modules/users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ItemModule,
    AuthModule
  ]
})

export class AppModule {}
