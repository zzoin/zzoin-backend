import { Injectable, Logger, BadRequestException } from "@nestjs/common"
import { CreateReviewDTO } from "./dto/create-review.dto"
import { UpdateReviewDTO } from "./dto/update-review.dto"
import { UserDTO } from "src/users/dtos/user.dto"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name)

  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDTO: CreateReviewDTO, userDTO: UserDTO) {
    const { id: authorId } = userDTO
    const { restaurantId } = createReviewDTO

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

  findOne(id: string) {
    return this.prisma.review.findFirst({
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
  }

  async update(id: string, updateReviewDTO: UpdateReviewDTO, userDTO: UserDTO) {
    const { id: authorId } = userDTO

    const review = await this.prisma.review.findFirst({
      where: { id },
    })

    if (!review) throw new BadRequestException("리뷰가 존재하지 않습니다.")

    if (review.authorId !== authorId)
      throw new BadRequestException("해당 유저에게 리뷰 수정 권한이 없습니다.")

    try {
      await this.prisma.review.update({
        where: { id },
        data: updateReviewDTO,
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string, userDTO: UserDTO) {
    const { id: authorId } = userDTO

    const review = await this.prisma.review.findFirst({
      where: { authorId, id },
    })

    if (!review) throw new BadRequestException("리뷰가 존재하지 않습니다.")

    if (review.authorId !== authorId)
      throw new BadRequestException("해당 유저에게 리뷰 삭제 권한이 없습니다.")

    try {
      await this.prisma.review.delete({
        where: { id },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
