import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  JwtConfig,
  JwtPayload,
  jwtConfig as jwtConfigEnv,
} from '@src/config/jwt.config';
import { AdminModel } from '@src/entities/admin/admin.model';
import { AdminService } from '@src/entities/admin/admin.service';
import { CreateUserDto } from '@src/entities/user/dtos/create-user.dto';
import { SigninDto } from '@src/entities/user/dtos/signin.dto';
import { SignupDto } from '@src/entities/user/dtos/signup.dto';
import { UserModel } from '@src/entities/user/user.model';
import { UserService } from '@src/entities/user/user.service';
import { UserAlreadyExistsException } from '@src/exceptions/http-exceptions/UserAlreadyExistsException';
import { UserNotFoundException } from '@src/exceptions/http-exceptions/UserNotFoundException';
import { compareSync } from 'bcrypt';
import * as jose from 'jose';
import { FindOptionsWhere } from 'typeorm';

export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    @Inject(jwtConfigEnv.KEY) private jwtConfig: JwtConfig,
  ) {}

  async signin(data: SigninDto) {
    const user = await this.findUser({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('user not found.');
    }
    if (!compareSync(data.password, user.password)) {
      throw new UnauthorizedException('authentication parameters not valid.');
    }
    let accessToken: string, refreshToken: string;
    if (user instanceof AdminModel) {
      [accessToken, refreshToken] = await this._getJWTTokens({
        sub: user.id,
        email: user.email,
        fullName: `${user.firstName[0]}.${user.lastName}`,
        avatarUrl: user.avatarUrl,
        role: 'admin',
      });
    } else {
      [accessToken, refreshToken] = await this._getJWTTokens({
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarPath,
        role: 'user',
      });
    }
    return { user, accessToken: accessToken, refreshToken: refreshToken };
  }

  async signup(data: SignupDto) {
    try {
      await this.userService.findOneBy({
        email: data.email,
      });
      throw new UserAlreadyExistsException();
    } catch (error) {
      if (!(error instanceof UserNotFoundException)) {
        throw error;
      }
    }

    const user = await this.userService.create(data as CreateUserDto);
    const [accessToken, refreshToken] = await this._getJWTTokens({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      avatarUrl: user.avatarPath,
      role: 'user',
    });
    return { user, accessToken: accessToken, refreshToken: refreshToken };
  }

  async refreshToken(user: UserModel | AdminModel) {
    // const user = await this.userService.findOneBy({ id: userId });
    let payload: JwtPayload;
    if (user instanceof UserModel) {
      payload = {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarPath,
        role: 'user',
      };
    } else {
      payload = {
        sub: user.id,
        email: user.email,
        fullName: `${user.firstName[0]}.${user.lastName}`,
        avatarUrl: user.avatarUrl,
        role: 'admin',
      };
    }
    const accessToken = await this._getJWTToken(payload);
    return {
      success: true,
      accessToken: accessToken,
    };
  }

  private async _generateJWT(
    payload: JwtPayload,
    { ttl, jwtKey }: { ttl: string; jwtKey: string },
  ): Promise<string> {
    const secret = new TextEncoder().encode(jwtKey);
    return await new jose.SignJWT({ ...payload })
      .setIssuer(this.jwtConfig.jwtIssuer)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(ttl)
      .sign(secret);
  }

  private async _getJWTTokens(payload: JwtPayload) {
    const tokens = await Promise.all([
      this._generateJWT(payload, {
        ttl: this.jwtConfig.jwtAccessTtl,
        jwtKey: this.jwtConfig.jwtAccessKey,
      }),
      this._generateJWT(payload, {
        ttl: this.jwtConfig.jwtRefreshTtl,
        jwtKey: this.jwtConfig.jwtRefreshKey,
      }),
    ]);
    return tokens;
  }

  private _getJWTToken(payload: JwtPayload) {
    return this._generateJWT(payload, {
      ttl: this.jwtConfig.jwtAccessTtl,
      jwtKey: this.jwtConfig.jwtAccessKey,
    });
  }

  static async verifyJwt(
    jwt: string,
    jwtKey: string,
  ): Promise<JwtSuccessResponse | JwtFailureResponse> {
    const secret = new TextEncoder().encode(jwtKey);
    return jose
      .jwtVerify<JwtPayload>(jwt, secret)
      .then((res) => {
        return {
          success: true,
          ...res,
        };
      })
      .catch((error) => {
        return {
          success: false,
          message: error.message,
        };
      });
  }

  public async findUser(
    filters: FindOptionsWhere<AdminModel | UserModel | null>,
  ) {
    let user: AdminModel | UserModel | null = null;
    try {
      user = await this.userService.findOneBy(filters);
    } catch (error) {
      if (error instanceof NotFoundException) {
        try {
          user = await this.adminService.findOne(filters);
        } catch (error) {
          if (!(error instanceof NotFoundException)) {
            throw error;
          }
        }
      }
    }
    return user;
  }
}

export interface JwtSuccessResponse {
  success: boolean;
  payload: JwtPayload;
}

export interface JwtFailureResponse {
  success: boolean;
  message: string;
}
