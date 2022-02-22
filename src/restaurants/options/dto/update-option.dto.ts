import { PickType, PartialType } from "@nestjs/swagger"
import { CreateOptionDTO } from "./create-option.dto"

export class UpdateOptionDTO extends PartialType(
  PickType(CreateOptionDTO, ["name", "iconImageUrl"] as const),
) {}
