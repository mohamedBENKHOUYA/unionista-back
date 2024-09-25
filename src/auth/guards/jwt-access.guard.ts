import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtConfig, jwtConfig as jwtConfigEnv } from '@src/config/jwt.config';
import { Request } from 'express';
import { AuthService, JwtSuccessResponse } from '../auth.service';

export class JwtAccessGuard implements CanActivate {
  constructor(
    @Inject(jwtConfigEnv.KEY) private jwtConfig: JwtConfig,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const bearer = request.headers.authorization;
    if (!bearer) return false;
    const accessToken = bearer.split(' ')[1];

    const res = await AuthService.verifyJwt(
      accessToken,
      this.jwtConfig.jwtAccessKey,
    );
    if (res.success) {
      request.user = (await this.authService.findUser({
        email: (res as JwtSuccessResponse).payload.email,
      }));
      return true;
    }
    return false;
  }
}
