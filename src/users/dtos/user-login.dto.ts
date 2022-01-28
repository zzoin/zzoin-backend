import { PickType } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { UserDTO } from "./user.dto"

export class UserLogInDTO extends PickType(UserDTO, ["email"] as const) {
  @IsString()
  @IsNotEmpty({ message: "비밀번호를 작성해주세요." })
  password: string
}
