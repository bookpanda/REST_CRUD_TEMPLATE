import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import * as argon from "argon2";

import { PrismaService } from "src/prisma/prisma.service";

import { SignInDto, SignUpDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: SignUpDto) {
    const checkEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (checkEmail) throw new ForbiddenException("Email taken");

    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        hash,
      },
    });
    return this.signTokens(user.id, user.email);
  }

  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException("Credentials Incorrect");

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException("Credentials Incorrect");

    return this.signTokens(user.id, user.email);
  }

  async signTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const atSecret = this.config.get("JWT_AT_SECRET");
    const rtSecret = this.config.get("JWT_RT_SECRET");
    const [at, rt] = await Promise.all([
      this.jwt.sign(payload, {
        expiresIn: 60 * 15,
        secret: atSecret,
      }),
      this.jwt.sign(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: rtSecret,
      }),
    ]);
    return { access_token: at, refresh_token: rt };
  }
}
