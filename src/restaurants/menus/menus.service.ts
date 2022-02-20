import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

import { CreateMenuDTO } from "./dto/create-menu.dto"
import { UpdateMenuDTO } from "./dto/update-menu.dto"

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(restaurantId: string, createMenuDTO: CreateMenuDTO) {
    try {
      await this.prisma.menu.create({
        data: { restaurantId, ...createMenuDTO },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findAll() {
    return this.prisma.menu.findMany({
      select: {
        id: true,
        restaurantId: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    })
  }

  findAllByRestaurantId(restaurantId: string) {
    return this.prisma.menu.findMany({
      where: {
        restaurantId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    })
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        restaurantId: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    })

    if (!menu) throw new BadRequestException("메뉴가 존재하지 않습니다.")

    return menu
  }

  async update(restaurantId: string, id: string, updateMenuDTO: UpdateMenuDTO) {
    const menu = await this.prisma.menu.findFirst({
      where: { restaurantId, id },
    })

    if (!menu) throw new BadRequestException("메뉴가 존재하지 않습니다.")

    try {
      await this.prisma.menu.update({
        where: { id },
        data: { restaurantId, ...updateMenuDTO },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(restaurantId: string, id: string) {
    const menu = await this.prisma.menu.findFirst({
      where: { restaurantId, id },
    })

    if (!menu) throw new BadRequestException("메뉴가 존재하지 않습니다.")

    try {
      await this.prisma.menu.delete({
        where: { id },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
