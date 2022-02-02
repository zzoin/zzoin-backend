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
    @Body() createReviewDTO: CreateReviewDTO,
    @CurrentUser() userDTO: UserDTO,
  ) {
    return await this.reviewsService.create(createReviewDTO, userDTO)
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.reviewsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateReviewDTO: UpdateReviewDTO) {
    return this.reviewsService.update(+id, updateReviewDTO)
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id") id: string, @CurrentUser() userDTO: UserDTO) {
    return this.reviewsService.remove(id, userDTO)
  }
}
