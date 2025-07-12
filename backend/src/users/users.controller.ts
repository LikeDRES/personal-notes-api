import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { toUserResponseDto, UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User created", type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return toUserResponseDto(user);
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user's profile" })
  @ApiResponse({ status: 200, description: "Current user", type: UserResponseDto })
  getProfile(@CurrentUser() user: any): UserResponseDto {
    // Si quieres puedes usar findByEmail para traer info actualizada desde DB
    return toUserResponseDto(user);
  }
}
