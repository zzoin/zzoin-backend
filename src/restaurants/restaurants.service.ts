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
  DEFAULT_RESTAURANTS_LIMIT = 10

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

  async findAll(query) {
    const { search, start, limit, excludes } = query

    let excludedCategories: string[] = []
    if (excludes) excludedCategories = JSON.parse(excludes)

    const restaruants = await this.prisma.restaurant.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: Number(start) || 0,
      take: Number(limit) || this.DEFAULT_RESTAURANTS_LIMIT,
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        mapUrl: true,
        phoneNumber: true,
        openingHours: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (excludedCategories.length === 0) return restaruants

    // TODO: 프리즈마 쿼리로 해결해야함
    const notExcludedRestaurants = (await restaruants).filter((restaurant) => {
      const ids = restaurant.categories.map((category) => category.id)
      const isExcluded =
        ids.filter((id) => excludedCategories.includes(id)).length > 0
      return !isExcluded
    })

    return notExcludedRestaurants
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
