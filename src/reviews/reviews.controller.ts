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
import { AuthorGuard } from "./reviews.guard"

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createReviewDTO: CreateReviewDTO,
    @CurrentUser() userDTO: UserDTO,
  ) {
    return this.reviewsService.create(createReviewDTO, userDTO)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(id)
  }

  @Patch(":id")
  @UseGuards(AuthorGuard)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() updateReviewDTO: UpdateReviewDTO,
  ) {
    return this.reviewsService.update(id, updateReviewDTO)
  }

  @Delete(":id")
  @UseGuards(AuthorGuard)
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id") id: string) {
    return this.reviewsService.remove(id)
  }
}
