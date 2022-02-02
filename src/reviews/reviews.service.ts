import { Injectable, Logger, BadRequestException } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateReviewDTO } from "./dto/create-review.dto"
import { UpdateReviewDTO } from "./dto/update-review.dto"
import { UserDTO } from "src/users/dtos/user.dto"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name)

  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDTO: CreateReviewDTO, userDTO: UserDTO) {
    const { email } = userDTO
    const { restaurantId } = createReviewDTO

    const { id: authorId } = await this.prisma.user.findFirst({
      where: { email },
    })

    const reviews = await this.prisma.review.findMany({
      where: { authorId, restaurantId },
    })

    if (reviews.length > 0) {
      throw new BadRequestException(
        "해당 유저의 리뷰가 이미 해당 식당에 존재합니다.",
      )
    }

    try {
      await this.prisma.review.create({
        data: {
          ...createReviewDTO,
          authorId,
        },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findFirst({
      where: { id },
      select: {
        id: true,
        content: true,
        score: true,
        createdAt: true,
        updatedAt: true,
        deleted: true,
        author: {
          select: {
            id: true,
            email: true,
            username: true,
            profileImageUrl: true,
          },
        },
      },
    })

    return review
  }

  async update(id: number, updateReviewDTO: UpdateReviewDTO) {
    return `This action updates a #${id} review`
  }

  async remove(id: string, userDTO: UserDTO) {
    const { email } = userDTO

    const { id: authorId } = await this.prisma.user.findFirst({
      where: { email },
    })

    const review = await this.prisma.review.findFirst({
      where: { authorId, id },
    })

    if (!review) {
      throw new BadRequestException("해당 유저에게 리뷰 삭제 권한이 없습니다.")
    }

    try {
      await this.prisma.review.delete({
        where: { id },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new BadRequestException("해당하는 리뷰를 찾을 수 없습니다.")
        }
      }

      throw new BadRequestException(error.message)
    }
  }
}
