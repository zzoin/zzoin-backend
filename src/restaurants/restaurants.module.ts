import { Module } from "@nestjs/common"
import { RestaurantsService } from "./restaurants.service"
import { RestaurantsController } from "./restaurants.controller"
import { MenusModule } from "./menus/menus.module"
import { ImagesModule } from "./images/images.module"
import { OptionsModule } from "./options/options.module"
import { CategoriesModule } from "./categories/categories.module"
import { MenusService } from "./menus/menus.service"
import { PrismaService } from "src/prisma.service"

@Module({
  imports: [MenusModule, ImagesModule, OptionsModule, CategoriesModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, MenusService, PrismaService],
})
export class RestaurantsModule {}
