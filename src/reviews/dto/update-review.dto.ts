import { PickType } from "@nestjs/swagger"
import { Review } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateReviewDTO } from "./create-review.dto"

export class UpdateReviewDTO extends PickType(CreateReviewDTO, [
  "content",
  "score",
] as const) {
  @IsString({ message: "올바른 리뷰 ID를 입력해주세요." })
  @IsNotEmpty({ message: "리뷰 ID를 입력해주세요." })
  id: Review["id"]
}
