import { OmitType } from "@nestjs/swagger"
import { RestaurantDTO } from "./restaurant.dto"

export class CreateRestaurantDTO extends OmitType(RestaurantDTO, [
  "id",
] as const) {}
