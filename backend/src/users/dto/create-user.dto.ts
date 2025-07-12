import { IsString, IsEmail, Length, MinLength, MaxLength, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
  @MaxLength(50, { message: "El nombre no puede superar los 50 caracteres" })
  name: string;

  @IsEmail({}, { message: "El correo electrónico no es válido" })
  @Length(5, 100, { message: "El correo debe tener entre 5 y 100 caracteres" })
  email: string;

  @IsString()
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @MaxLength(64, { message: "La contraseña no puede superar los 64 caracteres" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "La contraseña debe incluir mayúsculas, minúsculas y números",
  })
  password: string;
}
