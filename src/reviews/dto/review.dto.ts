import { Review } from "@prisma/client"
import { IsNotEmpty, IsString, IsInt, Length, Max, Min } from "class-validator"
import { UserDTO } from "src/users/dtos/user.dto"

export class ReviewDTO {
  id: Review["id"]

  @IsString({ message: "올바른 식당 ID를 입력해주세요." })
  @IsNotEmpty({ message: "식당 ID를 입력해주세요." })
  restaurantId: Review["restaurantId"]

  @IsString()
  @Length(1, 500)
  content: Review["content"]

  @IsInt()
  @Min(1)
  @Max(5)
  score: Review["score"]

  author: UserDTO
}
