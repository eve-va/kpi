import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { ImageModule } from "./modules/images/image.module";
import { ItemModule } from "./modules/items/item.module";
import { ReviewModule } from "./modules/reviews/review.module";
import { UserModule } from "./modules/users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ItemModule,
    AuthModule,
    ReviewModule,
    ImageModule,
  ]
})

export class AppModule {}
