import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { UserDTO } from "./dtos/user.dto"
import { UserLogInDTO } from "./dtos/user-login.dto"
import { UserRegisterDTO } from "./dtos/user-register.dto"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(userRegisterDTO: UserRegisterDTO): Promise<void> {
    const { email, password } = userRegisterDTO
    const user = await this.prisma.user.findFirst({ where: { email } })
    if (user) {
      throw new UnauthorizedException("해당하는 이메일은 이미 존재합니다.")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await this.prisma.user.create({
      data: {
        ...userRegisterDTO,
        password: hashedPassword,
      },
    })
  }

  async verifyUserAndSignJwt(
    email: UserLogInDTO["email"],
    password: UserLogInDTO["password"],
  ): Promise<{ jwt: string; user: UserDTO }> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user)
      throw new UnauthorizedException("해당하는 이메일은 존재하지 않습니다.")
    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException("로그인에 실패하였습니다.")
    try {
      const jwt = await this.jwtService.signAsync(
        { sub: user.id },
        { secret: this.configService.get("SECRET_KEY") },
      )
      return { jwt, user }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } })
      if (!user) throw new Error()
      return user
    } catch (error) {
      throw new BadRequestException("해당하는 사용자를 찾을 수 없습니다.")
    }
  }
}
