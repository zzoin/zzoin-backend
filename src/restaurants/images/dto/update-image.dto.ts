import { PartialType } from "@nestjs/swagger"
import { CreateRestaurantImageDTO } from "./create-image.dto"

export class UpdateRestaurantImageDTO extends PartialType(
  CreateRestaurantImageDTO,
) {}
