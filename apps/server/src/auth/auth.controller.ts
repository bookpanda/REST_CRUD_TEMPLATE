import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { GetUser } from "./decorator";
import { SignInDto, SignUpDto } from "./dto";
import { AtGuard, RtGuard } from "./guards";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(AtGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@GetUser("sub") userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser("sub") userId: string,
    @GetUser("refreshToken") refreshToken: string
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
