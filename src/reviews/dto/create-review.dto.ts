import { Review } from "@prisma/client"
import { IsNotEmpty, IsString, IsInt, Length, Max, Min } from "class-validator"
export class CreateReviewDTO {
  @IsString({ message: "올바른 식당 ID를 입력해주세요." })
  @IsNotEmpty({ message: "식당 ID를 입력해주세요." })
  restaurantId: Review["restaurantId"]

  @IsString({ message: "올바른 작성자 ID를 입력해주세요." })
  @IsNotEmpty({ message: "작성자 ID를 입력해주세요." })
  authorId: Review["authorId"]

  @IsString()
  @Length(1, 500)
  content: Review["content"]

  @IsInt()
  @Min(1)
  @Max(5)
  score: Review["score"]
}
