import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';
import { JwtConfig, jwtConfig as jwtConfigEnv } from '@src/config/jwt.config';
import { UserService } from '@src/entities/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    @Inject(jwtConfigEnv.KEY) private jwtConfig: JwtConfig,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.body.refresh_token;
    if (!refreshToken) return false;

    const res = await AuthService.verifyJwt(
      refreshToken,
      this.jwtConfig.jwtRefreshKey,
    );
    if (res.success) {
        //@ts-ignore
        
      request.user = await this.userService.findOneBy({
        //@ts-ignore
        emailAddress: res.payload.email,
      });
      return true;
    }
    return false;
  }
}
