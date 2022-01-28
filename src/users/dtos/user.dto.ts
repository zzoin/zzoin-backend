import { User } from "@prisma/client"
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserDTO {
  @IsEmail({}, { message: "올바른 이메일을 작성해주세요." })
  @IsNotEmpty({ message: "이메일을 작성해주세요." })
  email: User["email"]

  @IsString()
  @IsNotEmpty({ message: "이름을 작성해주세요." })
  username: User["username"]

  @IsBoolean()
  isAdmin: User["isAdmin"]
}
