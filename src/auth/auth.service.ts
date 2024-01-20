import { sign, verify } from 'jsonwebtoken';
import { UserAlreadyExistsException } from '@src/exceptions/http-exceptions/UserAlreadyExistsException';
import { hash, compareSync, genSalt } from 'bcrypt';
import { SigninDto } from '@src/entities/user/dtos/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '@src/entities/user/user.model';
import { Repository } from 'typeorm';
import {
  ForbiddenException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from '@src/entities/user/dtos/signup.dto';
import {
  JwtConfig,
  JwtPayload,
  jwtConfig as jwtConfigEnv,
} from '@src/config/jwt.config';
import { UserService } from '@src/entities/user/user.service';
import { CreateUserDto } from '@src/entities/user/dtos/create-user.dto';
import { UserNotFoundException } from '@src/exceptions/http-exceptions/UserNotFoundException';
import { join } from 'path';

export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(jwtConfigEnv.KEY) private jwtConfig: JwtConfig,
  ) {}

  async signin(data: SigninDto) {
    const user = await this.userService.findOneBy({ emailAddress: data.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!compareSync(data.password, user.password)) {
      throw new UnauthorizedException();
    }
    const [accessToken, refreshToken] = this._getTokens({
      email: user.emailAddress,
      sub: user.id,
    });
    return { user, accessToken: accessToken, refreshToken: refreshToken };
  }

  async signup(data: SignupDto) {
    try {
      await this.userService.findOneBy({
        emailAddress: data.email,
      });
      throw new UserAlreadyExistsException();
    } catch (error) {
      if (!(error instanceof UserNotFoundException)) {
        throw error;
      }
    }

    const user = await this.userService.create(data as CreateUserDto);
    const [accessToken, refreshToken] = this._getTokens({
      sub: user.id,
      email: user.emailAddress,
    });
    return { user, accessToken: accessToken, refreshToken: refreshToken };
  }

  async refreshTokens(user: UserModel) {
    // const user = await this.userService.findOneBy({ id: userId });
    const [accessToken, refreshToken] = this._getTokens({
      email: user.emailAddress,
      sub: user.id,
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  private _generateJWT(
    payload: JwtPayload,
    { ttl, jwtKey }: { ttl: string; jwtKey: string },
  ): string {
    const privateKey = jwtKey;
    return sign(payload, privateKey, {
      issuer: this.jwtConfig.jwtIssuer,
      expiresIn: ttl,
      // algorithm: '',
    });
  }

  private _getTokens(payload: JwtPayload) {
    return [
      this._generateJWT(payload, {
        ttl: this.jwtConfig.jwtAccessTtl,
        jwtKey: this.jwtConfig.jwtAccessKey,
      }),
      this._generateJWT(payload, {
        ttl: this.jwtConfig.jwtRefreshTtl,
        jwtKey: this.jwtConfig.jwtRefreshKey,
      }),
    ];
  }
}
