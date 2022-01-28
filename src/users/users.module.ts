import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./jwt/jwt.strategy"
import { UsersService } from "./users.service"
import { PrismaService } from "src/prisma.service"

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: true }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      secretOrPrivateKey: process.env.SECRET_KEY,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [JwtStrategy, UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
