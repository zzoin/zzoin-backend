import { Injectable } from "@nestjs/common"
import { CreateRestaurantDTO } from "./dto/create-restaurant.dto"
import { UpdateRestaurantDTO } from "./dto/update-restaurant.dto"

@Injectable()
export class RestaurantsService {
  create(createRestaurantDto: CreateRestaurantDTO) {
    return "This action adds a new restaurant"
  }

  findAll() {
    return `This action returns all restaurants`
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDTO) {
    return `This action updates a #${id} restaurant`
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`
  }
}
