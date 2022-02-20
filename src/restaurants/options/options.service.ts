import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

import { CreateOptionDTO } from "./dto/create-option.dto"
import { UpdateOptionDTO } from "./dto/update-option.dto"

@Injectable()
export class OptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOptionDto: CreateOptionDTO) {
    const { name } = createOptionDto

    const option = await this.prisma.option.findFirst({
      where: { name },
    })

    if (option) {
      throw new BadRequestException("같은 이름의 옵션이 이미 존재합니다.")
    }

    try {
      await this.prisma.option.create({
        data: createOptionDto,
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findAll() {
    return this.prisma.option.findMany({
      select: {
        id: true,
        name: true,
        iconImageUrl: true,
      },
    })
  }

  findOne(id: string) {
    return this.prisma.option.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        iconImageUrl: true,
      },
    })
  }

  async update(id: string, updateOptionDTO: UpdateOptionDTO) {
    const option = await this.prisma.option.findFirst({
      where: { id },
    })

    if (!option) throw new BadRequestException("옵션이 존재하지 않습니다.")

    try {
      await this.prisma.option.update({
        where: { id },
        data: updateOptionDTO,
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string) {
    const review = await this.prisma.option.findFirst({
      where: { id },
    })

    if (!review) throw new BadRequestException("옵션이 존재하지 않습니다.")

    try {
      await this.prisma.option.delete({
        where: { id },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
