import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { PrismaService } from "$src/prisma/prisma.service";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_AT_SECRET"),
    });
  }
  validate(req: Request, payload: { sub: string; email: string }) {
    const refreshToken = req.get("authorization")?.replace("Bearer", "").trim();
    return { ...payload, refreshToken };
  }
}
