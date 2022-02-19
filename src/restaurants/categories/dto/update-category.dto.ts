import { PickType, PartialType } from "@nestjs/swagger"
import { CreateCategoryDTO } from "./create-category.dto"

export class UpdateCategoryDTO extends PartialType(
  PickType(CreateCategoryDTO, ["name", "iconImageUrl"] as const),
) {}
