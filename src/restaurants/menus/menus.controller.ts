import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { MenusService } from "./menus.service"

import { JwtAuthGuard } from "src/users/jwt/jwt.guard"
import { Role } from "src/users/roles/roles.decorator"
import { RolesGuard } from "src/users/roles/roles.guard"
@Controller("menus")
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.menusService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.menusService.findOne(id)
  }
}
