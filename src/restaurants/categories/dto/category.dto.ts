import { Category } from "@prisma/client"
import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CategoryDTO {
  id: Category["id"]

  @IsString({ message: "올바른 카테고리 이름을 입력해주세요." })
  @IsNotEmpty({ message: "카테고리 이름을 입력해주세요." })
  name: Category["name"]

  @IsString({ message: "올바른 카테고리 이미지 아이콘 URL을 입력해주세요." })
  @IsNotEmpty({ message: "카테고리 이미지 아이콘 URL을 입력해주세요." })
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
    message: "올바르지 않은 URL 형태입니다.",
  })
  iconImageUrl: Category["iconImageUrl"]
}
