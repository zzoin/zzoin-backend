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
import { CategoriesService } from "./categories.service"
import { CreateCategoryDTO } from "./dto/create-category.dto"
import { UpdateCategoryDTO } from "./dto/update-category.dto"

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(id)
  }

  @Patch(":id")
  @Role("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ) {
    return this.categoriesService.update(id, updateCategoryDto)
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id)
  }
}
