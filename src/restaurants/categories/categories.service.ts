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
    return `This action returns all categories`
  }

  findOne(id: number) {
    return `This action returns a #${id} category`
  }

  update(id: number, updateCategoryDto: UpdateCategoryDTO) {
    return `This action updates a #${id} category`
  }

  remove(id: number) {
    return `This action removes a #${id} category`
  }
}
