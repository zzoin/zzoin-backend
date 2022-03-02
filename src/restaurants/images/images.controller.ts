import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { ImagesService } from "./images.service"

import { JwtAuthGuard } from "src/users/jwt/jwt.guard"
import { Role } from "src/users/roles/roles.decorator"
import { RolesGuard } from "src/users/roles/roles.guard"

@Controller("restaurant-images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.imagesService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(id)
  }
}
