import { Module } from "@nestjs/common"
import { RestaurantsService } from "./restaurants.service"
import { RestaurantsController } from "./restaurants.controller"
import { ReviewsModule } from "./reviews/reviews.module"
import { MenusModule } from "./menus/menus.module"
import { ImagesModule } from "./images/images.module"
import { OptionsModule } from "./options/options.module"
import { CategoriesModule } from "./categories/categories.module"
import { ReviewsService } from "./reviews/reviews.service"
import { MenusService } from "./menus/menus.service"
import { ImagesService } from "./images/images.service"
import { PrismaService } from "src/prisma.service"

@Module({
  imports: [
    ReviewsModule,
    MenusModule,
    ImagesModule,
    OptionsModule,
    CategoriesModule,
  ],
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    ReviewsService,
    MenusService,
    ImagesService,
    PrismaService,
  ],
})
export class RestaurantsModule {}
