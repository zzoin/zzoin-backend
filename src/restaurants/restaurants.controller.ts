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
import { RestaurantsService } from "./restaurants.service"
import { ReviewsService } from "./reviews/reviews.service"
import { MenusService } from "./menus/menus.service"

import { CurrentUser } from "src/common/decorators/current-user.decorator"
import { Role } from "src/users/roles/roles.decorator"

import { JwtAuthGuard } from "src/users/jwt/jwt.guard"
import { AuthorGuard } from "./reviews/reviews.guard"
import { RolesGuard } from "src/users/roles/roles.guard"

import { CreateRestaurantDTO } from "./dto/create-restaurant.dto"
import { UpdateRestaurantDTO } from "./dto/update-restaurant.dto"
import { UserDTO } from "./../users/dtos/user.dto"
import { CreateMenuDTO } from "./menus/dto/create-menu.dto"
import { UpdateMenuDTO } from "./menus/dto/update-menu.dto"
import { CreateReviewDTO } from "./reviews/dto/create-review.dto"
import { UpdateReviewDTO } from "./reviews/dto/update-review.dto"

@Controller("restaurants")
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly reviewsService: ReviewsService,
    private readonly menusService: MenusService,
  ) {}

  @Post()
  create(@Body() createRestaurantDTO: CreateRestaurantDTO) {
    return this.restaurantsService.create(createRestaurantDTO)
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
    @Body() updateRestaurantDTO: UpdateRestaurantDTO,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDTO)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.restaurantsService.remove(+id)
  }

  /* 리뷰 */
  @Post(":id/reviews")
  @UseGuards(JwtAuthGuard)
  createReview(
    @Param("id") id: string,
    @Body() createReviewDTO: CreateReviewDTO,
    @CurrentUser() userDTO: UserDTO,
  ) {
    return this.reviewsService.create(id, createReviewDTO, userDTO)
  }

  @Get(":id/reviews")
  findAllReviewByRestaurantId(@Param("id") id: string) {
    return this.reviewsService.findAllByRestaurantId(id)
  }

  @Patch(":id/reviews/:reviewId")
  @UseGuards(AuthorGuard)
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @Param("id") id: string,
    @Param("reviewId") reviewId: string,
    @Body() updateReviewDTO: UpdateReviewDTO,
  ) {
    return this.reviewsService.update(id, reviewId, updateReviewDTO)
  }

  @Delete(":id/reviews/:reviewId")
  @UseGuards(AuthorGuard)
  @UseGuards(JwtAuthGuard)
  async removeReview(
    @Param("id") id: string,
    @Param("reviewId") reviewId: string,
  ) {
    return this.reviewsService.remove(id, reviewId)
  }

  /* 메뉴 */
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
