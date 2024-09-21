import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtConfig, jwtConfig as jwtConfigEnv } from '@src/config/jwt.config';
import { AuthService, JwtSuccessResponse } from '../auth.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    @Inject(jwtConfigEnv.KEY) private jwtConfig: JwtConfig,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.body.refresh_token;
    if (!refreshToken) return false;

    let res = await AuthService.verifyJwt(
      refreshToken,
      this.jwtConfig.jwtRefreshKey,
    );
    if (res.success) {
      res = res as JwtSuccessResponse;
      request.user = await this.authService.findUser({ email: res.payload.email });
      return true;
    }
    return false;
  }
}
