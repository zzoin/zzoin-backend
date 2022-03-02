import { Controller, Get, Param } from "@nestjs/common"
import { ReviewsService } from "./reviews.service"

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(id)
  }
}
