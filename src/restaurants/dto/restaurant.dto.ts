import { Restaurant } from "@prisma/client"
import { IsNotEmpty, IsString, IsUrl, Matches } from "class-validator"

export class RestaurantDTO {
  id: Restaurant["id"]

  @IsString({ message: "식당 이름은 문자열이어야 합니다." })
  @IsNotEmpty({ message: "식당 이름을 비워둘 수 없습니다." })
  name: Restaurant["name"]

  @IsString({ message: "식당 설명은 문자열이어야 합니다." })
  description: Restaurant["description"]

  @IsString({ message: "식당 주소는 문자열이어야 합니다." })
  address: Restaurant["address"]

  @IsString({ message: "식당 지도 주소는 문자열이어야 합니다." })
  @IsUrl(
    {
      require_protocol: true,
      require_valid_protocol: true,
    },
    { message: "올바르지 않은 URL 형태입니다." },
  )
  mapUrl: Restaurant["mapUrl"]

  @IsString({ message: "식당 전화번호는 문자열이어야 합니다." })
  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, {
    message: "전화번호 형식에 맞지 않습니다.",
  })
  phoneNumber: Restaurant["phoneNumber"]

  @IsString({ message: "식당 영업시간은 문자열이어야 합니다." })
  openingHours: Restaurant["openingHours"]
}
