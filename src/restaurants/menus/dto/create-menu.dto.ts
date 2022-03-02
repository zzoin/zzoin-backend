import { IntersectionType, PartialType, PickType } from "@nestjs/swagger"
import { MenuDTO } from "./menu.dto"

export class CreateMenuDTO extends IntersectionType(
  PickType(MenuDTO, ["name"] as const),
  PartialType(PickType(MenuDTO, ["description", "price", "imageUrl"] as const)),
) {}
