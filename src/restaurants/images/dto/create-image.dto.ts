import { PickType } from "@nestjs/swagger"
import { RestaurantImageDTO } from "./image.dto"
export class CreateRestaurantImageDTO extends PickType(RestaurantImageDTO, [
  "imageUrl",
  "caption",
] as const) {}
