import { MenusService } from "./menus/menus.service"
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/users/jwt/jwt.guard"
import { Role } from "src/users/roles/roles.decorator"
import { RolesGuard } from "src/users/roles/roles.guard"
import { RestaurantsService } from "./restaurants.service"
import { CreateRestaurantDto } from "./dto/create-restaurant.dto"
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto"
import { CreateMenuDTO } from "./menus/dto/create-menu.dto"
import { UpdateMenuDTO } from "./menus/dto/update-menu.dto"

@Controller("restaurants")
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly menusService: MenusService,
  ) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto)
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantsService.findOne(+id)
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.restaurantsService.remove(+id)
  }

  @Post(":id/menus")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  createMenu(@Param("id") id: string, @Body() createMenuDTO: CreateMenuDTO) {
    return this.menusService.create(id, createMenuDTO)
  }

  @Get(":id/menus")
  findAllMenuByRestaurantId(@Param("id") id: string) {
    return this.menusService.findAllByRestaurantId(id)
  }

  @Patch(":id/menus/:menuId")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  updateMenu(
    @Param("id") id: string,
    @Param("menuId") menuId: string,
    @Body() updateMenuDTO: UpdateMenuDTO,
  ) {
    return this.menusService.update(id, menuId, updateMenuDTO)
  }

  @Delete(":id/menus/:menuId")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  removeMenu(@Param("id") id: string, @Param("menuId") menuId: string) {
    return this.menusService.remove(id, menuId)
  }
}
