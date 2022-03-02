import { PickType } from "@nestjs/swagger"
import { ReviewDTO } from "./review.dto"

export class CreateReviewDTO extends PickType(ReviewDTO, [
  "content",
  "score",
] as const) {}
