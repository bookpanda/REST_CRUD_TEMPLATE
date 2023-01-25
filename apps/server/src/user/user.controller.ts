import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";

import { GetUser } from "$src/auth/decorator";
import { AtGuard } from "$src/auth/guards";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AtGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  getUser(@GetUser("sub") userId: string) {
    return this.userService.getUser(userId);
  }
}
