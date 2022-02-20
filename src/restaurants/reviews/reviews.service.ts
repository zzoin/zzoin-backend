import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common"
import { CreateReviewDTO } from "./dto/create-review.dto"
import { UpdateReviewDTO } from "./dto/update-review.dto"
import { UserDTO } from "src/users/dtos/user.dto"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    restaurantId: string,
    createReviewDTO: CreateReviewDTO,
    userDTO: UserDTO,
  ) {
    const { id: authorId } = userDTO

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
          restaurantId,
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

    if (!review) throw new NotFoundException()

    return review
  }

  async update(
    restaurantId: string,
    id: string,
    updateReviewDTO: UpdateReviewDTO,
  ) {
    const review = await this.prisma.review.findFirst({
      where: { restaurantId, id },
    })

    if (!review) throw new BadRequestException("리뷰가 존재하지 않습니다.")

    try {
      await this.prisma.review.update({
        where: { id },
        data: { restaurantId, ...updateReviewDTO },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(restaurantId: string, id: string) {
    const review = await this.prisma.review.findFirst({
      where: { restaurantId, id },
    })

    if (!review) throw new BadRequestException("리뷰가 존재하지 않습니다.")

    try {
      await this.prisma.review.delete({
        where: { id },
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
