import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { AppController } from "./app.controller"
import { PrismaService } from "./prisma.service"
import { UsersModule } from "./users/users.module"
import { ReviewsModule } from "./reviews/reviews.module"
import { RestaurantsModule } from "./restaurants/restaurants.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test", "provision")
          .default("development"),
        PORT: Joi.number().default(5000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
      }),
    }),
    UsersModule,
    ReviewsModule,
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
