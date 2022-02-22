import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/users/jwt/jwt.guard"
import { Role } from "src/users/roles/roles.decorator"
import { RolesGuard } from "src/users/roles/roles.guard"
import { OptionsService } from "./options.service"
import { CreateOptionDTO } from "./dto/create-option.dto"
import { UpdateOptionDTO } from "./dto/update-option.dto"

@Controller("options")
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createOptionDTO: CreateOptionDTO) {
    return this.optionsService.create(createOptionDTO)
  }

  @Get()
  findAll() {
    return this.optionsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.optionsService.findOne(id)
  }

  @Patch(":id")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateOptionDTO: UpdateOptionDTO) {
    return this.optionsService.update(id, updateOptionDTO)
  }

  @Delete(":id")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.optionsService.remove(id)
  }
}
