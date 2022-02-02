import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { ReviewsService } from "./reviews.service"
import { CreateReviewDTO } from "./dto/create-review.dto"
import { UpdateReviewDTO } from "./dto/update-review.dto"
import { JwtAuthGuard } from "src/users/jwt/jwt.guard"
import { CurrentUser } from "src/common/decorators/current-user.decorator"
import { UserDTO } from "src/users/dtos/user.dto"

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() userDTO: UserDTO,
    @Body() createReviewDTO: CreateReviewDTO,
  ) {
    return await this.reviewsService.create(userDTO, createReviewDTO)
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateReviewDTO: UpdateReviewDTO) {
    return this.reviewsService.update(+id, updateReviewDTO)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id)
  }
}
