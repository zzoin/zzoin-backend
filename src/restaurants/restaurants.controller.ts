import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common"
import { CurrentUser } from "src/common/decorators/current-user.decorator"
import { Role } from "src/users/roles/roles.decorator"

import { JwtAuthGuard } from "src/users/jwt/jwt.guard"
import { AuthorGuard } from "./reviews/reviews.guard"
import { RolesGuard } from "src/users/roles/roles.guard"

import { RestaurantsService } from "./restaurants.service"
import { ReviewsService } from "./reviews/reviews.service"
import { MenusService } from "./menus/menus.service"
import { ImagesService } from "./images/images.service"

import { CreateRestaurantDTO } from "./dto/create-restaurant.dto"
import { UpdateRestaurantDTO } from "./dto/update-restaurant.dto"
import { UserDTO } from "./../users/dtos/user.dto"
import { CreateMenuDTO } from "./menus/dto/create-menu.dto"
import { UpdateMenuDTO } from "./menus/dto/update-menu.dto"
import { CreateReviewDTO } from "./reviews/dto/create-review.dto"
import { UpdateReviewDTO } from "./reviews/dto/update-review.dto"
import { UpdateRestaurantImageDTO } from "./images/dto/update-image.dto"
import { CreateRestaurantImageDTO } from "./images/dto/create-image.dto"

@Controller("restaurants")
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly reviewsService: ReviewsService,
    private readonly menusService: MenusService,
    private readonly imagesService: ImagesService,
  ) {}

  /* 식당 */
  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createRestaurantDTO: CreateRestaurantDTO) {
    return this.restaurantsService.create(createRestaurantDTO)
  }

  @Get()
  findAll(@Query() query) {
    return this.restaurantsService.findAll(query)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantsService.findOne(id)
  }

  @Patch(":id")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateRestaurantDTO: UpdateRestaurantDTO,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDTO)
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.restaurantsService.remove(id)
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

  @Post(":id/images")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  createImage(
    @Param("id") id: string,
    @Body() createRestaurantImageDTO: CreateRestaurantImageDTO,
  ) {
    return this.imagesService.create(id, createRestaurantImageDTO)
  }

  @Get(":id/images")
  findAllImageByRestaurantId(@Param("id") id: string) {
    return this.imagesService.findAllByRestaurantId(id)
  }

  @Patch(":id/images/:imageId")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  updateImage(
    @Param("id") id: string,
    @Param("imageId") imageId: string,
    @Body() updateRestaurantImageDTO: UpdateRestaurantImageDTO,
  ) {
    return this.imagesService.update(id, imageId, updateRestaurantImageDTO)
  }

  @Delete(":id/images/:imageId")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  removeImage(@Param("id") id: string, @Param("imageId") imageId: string) {
    return this.imagesService.remove(id, imageId)
  }
}
