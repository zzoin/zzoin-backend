import { PickType } from "@nestjs/swagger"
import { OptionDTO } from "./option.dto"

export class CreateOptionDTO extends PickType(OptionDTO, [
  "name",
  "iconImageUrl",
] as const) {}
