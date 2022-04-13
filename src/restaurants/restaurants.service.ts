import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

import { CreateRestaurantDTO } from "./dto/create-restaurant.dto"
import { UpdateRestaurantDTO } from "./dto/update-restaurant.dto"

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDTO) {
    try {
      await this.prisma.restaurant.create({
        data: createRestaurantDto,
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    return this.prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        mapUrl: true,
        phoneNumber: true,
        openingHours: true,
      },
    })
  }

  async findOne(id: string) {
    await this.validateRestaurantExisting(id)

    return this.prisma.restaurant.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        mapUrl: true,
        phoneNumber: true,
        openingHours: true,
      },
    })
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDTO) {
    await this.validateRestaurantExisting(id)

    try {
      await this.prisma.restaurant.update({
        where: { id },
        data: updateRestaurantDto,
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string) {
    await this.validateRestaurantExisting(id)

    try {
      await this.prisma.restaurant.delete({
        where: { id },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async validateRestaurantExisting(id: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { id },
    })

    if (!restaurant) throw new NotFoundException("식당이 존재하지 않습니다.")
  }
}
