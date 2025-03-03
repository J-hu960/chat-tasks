import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthTokenService implements AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService

  ) {}

  async generateToken(userId: string): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET'); 
    return this.jwtService.signAsync({ sub: userId }, { secret });  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}

export const AUTH_TOKEN_SERVICE = Symbol('auth-token-service')
