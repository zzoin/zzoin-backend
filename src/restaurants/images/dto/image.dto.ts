import { RestaurantImage } from "@prisma/client"
import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class RestaurantImageDTO {
  id: RestaurantImage["id"]

  @IsString({ message: "올바른 식당 ID를 입력해주세요." })
  @IsNotEmpty({ message: "식당 ID를 입력해주세요." })
  restaurantId: RestaurantImage["restaurantId"]

  @IsString({ message: "올바른 이미지 URL을 입력해주세요." })
  @IsUrl(
    {
      require_protocol: true,
      require_valid_protocol: true,
    },
    { message: "올바르지 않은 URL 형태입니다." },
  )
  imageUrl: RestaurantImage["imageUrl"]

  @IsString({ message: "올바른 캡션을 입력해주세요." })
  caption: RestaurantImage["caption"]
}
