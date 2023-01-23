import { ForbiddenException, Injectable } from "@nestjs/common";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";

import { PrismaService } from "src/prisma/prisma.service";

import { SignInDto, SignUpDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignUpDto) {
    const checkEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (checkEmail) throw new ForbiddenException("Email taken");

    const hash = await argon.hash(dto.password);
    const user = this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        hash,
      },
    });
    return user;
  }

  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException("Credentials Incorrect");

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException("Credentials Incorrect");

    return user;
  }
}
