import { Menu } from "@prisma/client"
import { IsNotEmpty, IsString, IsUrl, IsInt, Min } from "class-validator"

export class MenuDTO {
  id: Menu["id"]

  @IsString({ message: "올바른 식당 ID를 입력해주세요." })
  @IsNotEmpty({ message: "식당 ID를 입력해주세요." })
  restaurantId: Menu["restaurantId"]

  @IsString({ message: "올바른 메뉴 이름을 입력해주세요." })
  @IsNotEmpty({ message: "메뉴 이름을 입력해주세요." })
  name: Menu["name"]

  @IsString({ message: "올바른 메뉴 설명을 입력해주세요." })
  description: Menu["description"]

  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: "메뉴 가격을 입력해주세요." })
  price: Menu["price"]

  @IsString({ message: "올바른 메뉴 이미지 URL을 입력해주세요." })
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
    message: "올바르지 않은 URL 형태입니다.",
  })
  imageUrl: Menu["imageUrl"]
}
