import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
    const { id: userId } = user
    const { id: reviewId } = params

    const { authorId } = await this.prisma.review.findFirst({
      where: { id: reviewId },
    })

    return userId === authorId
  }
}
