import { PickType } from "@nestjs/swagger"
import { User } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"
import { UserDTO } from "./user.dto"

export class UserRegisterDTO extends PickType(UserDTO, [
  "email",
  "username",
] as const) {
  @IsString()
  @IsNotEmpty({ message: "이름을 작성해주세요." })
  password: User["password"]
}
