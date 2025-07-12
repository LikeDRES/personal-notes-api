import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login and get JWT token" })
  @ApiResponse({ status: 200, description: "JWT token" })
  async login(@Body() loginDto: LoginUserDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
