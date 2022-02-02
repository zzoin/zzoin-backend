import { PickType, PartialType } from "@nestjs/swagger"
import { Review } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateReviewDTO } from "./create-review.dto"

export class UpdateReviewDTO extends PartialType(
  PickType(CreateReviewDTO, ["content", "score"] as const),
) {}
