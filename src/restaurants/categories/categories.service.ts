import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

import { CreateCategoryDTO } from "./dto/create-category.dto"
import { UpdateCategoryDTO } from "./dto/update-category.dto"

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDTO) {
    const { name } = createCategoryDto

    const category = await this.prisma.category.findFirst({
      where: { name },
    })

    if (category) {
      throw new BadRequestException("같은 이름의 카테고리가 이미 존재합니다.")
    }

    try {
      await this.prisma.category.create({
        data: createCategoryDto,
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        iconImageUrl: true,
      },
    })
  }

  findOne(id: string) {
    return this.prisma.category.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        iconImageUrl: true,
      },
    })
  }

  async update(id: string, updateCategoryDTO: UpdateCategoryDTO) {
    const category = await this.prisma.category.findFirst({
      where: { id },
    })

    if (!category)
      throw new BadRequestException("카테고리가 존재하지 않습니다.")

    try {
      await this.prisma.category.update({
        where: { id },
        data: updateCategoryDTO,
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string) {
    const review = await this.prisma.category.findFirst({
      where: { id },
    })

    if (!review) throw new BadRequestException("카테고리가 존재하지 않습니다.")

    try {
      await this.prisma.category.delete({
        where: { id },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
