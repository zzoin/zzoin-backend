import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { CreateRestaurantImageDTO } from "./dto/create-image.dto"
import { UpdateRestaurantImageDTO } from "./dto/update-image.dto"

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    restaurantId: string,
    createRestaurantImageDTO: CreateRestaurantImageDTO,
  ) {
    try {
      await this.prisma.restaurantImage.create({
        data: { restaurantId, ...createRestaurantImageDTO },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findAll() {
    return this.prisma.restaurantImage.findMany({
      select: {
        id: true,
        restaurantId: true,
        imageUrl: true,
        caption: true,
      },
    })
  }

  findAllByRestaurantId(restaurantId: string) {
    return this.prisma.restaurantImage.findMany({
      where: {
        restaurantId,
      },
      select: {
        id: true,
        restaurantId: true,
        imageUrl: true,
        caption: true,
      },
    })
  }

  async findOne(id: string) {
    const restaurantImage = await this.prisma.restaurantImage.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        restaurantId: true,
        imageUrl: true,
        caption: true,
      },
    })

    if (!restaurantImage)
      throw new BadRequestException("식당 이미지가 존재하지 않습니다.")

    return restaurantImage
  }

  async update(
    restaurantId: string,
    id: string,
    updateRestaurantImageDTO: UpdateRestaurantImageDTO,
  ) {
    const restaurantImage = await this.prisma.restaurantImage.findFirst({
      where: { restaurantId, id },
    })

    if (!restaurantImage)
      throw new BadRequestException("식당 이미지가 존재하지 않습니다.")

    try {
      await this.prisma.restaurantImage.update({
        where: { id },
        data: { restaurantId, ...updateRestaurantImageDTO },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(restaurantId: string, id: string) {
    const restaurantImage = await this.prisma.restaurantImage.findFirst({
      where: { restaurantId, id },
    })

    if (!restaurantImage)
      throw new BadRequestException("식당 이미지가 존재하지 않습니다.")

    try {
      await this.prisma.restaurantImage.delete({
        where: { id },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
