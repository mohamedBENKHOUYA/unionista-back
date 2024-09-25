import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  JwtConfig,
  JwtPayload,
  jwtConfig as jwtConfigEnv,
} from '@src/config/jwt.config';
import { ClientService } from '@src/entities/user/client/client.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @Inject(jwtConfigEnv.KEY) private jwtConfig: JwtConfig,
    private clientService: ClientService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.jwtAccessKey,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    return this.clientService.findOneBy({ id: payload.sub });
  }
}
