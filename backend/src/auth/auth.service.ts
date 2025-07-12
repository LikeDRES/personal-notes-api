import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { LoginResponseDto } from "./dto/login-response.dto";
import { toUserResponseDto } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: toUserResponseDto(user),
    };
  }
}
