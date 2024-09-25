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
import { AdminModel } from '@src/entities/user/admin/admin.model';
import { AdminService } from '@src/entities/user/admin/admin.service';
import { ClientModel } from '@src/entities/user/client/client.model';
import { ClientService } from '@src/entities/user/client/client.service';
import { ClientSignupDto } from '@src/entities/user/client/dtos/client-signup.dto';
import { CreateClientDto } from '@src/entities/user/client/dtos/create-client.dto';
import { UserSigninDto } from '@src/entities/user/dtos/user-signin.dto';
import { User } from '@src/entities/user/dtos/user.dto';
import { ClientAlreadyExistsException } from '@src/exceptions/http-exceptions/ClientAlreadyExistsException';
import { ClientNotFoundException } from '@src/exceptions/http-exceptions/ClientNotFoundException';
import { compareSync } from 'bcrypt';
import * as jose from 'jose';
import { FindOptionsWhere } from 'typeorm';

export class AuthService {
  constructor(
    private clientService: ClientService,
    private adminService: AdminService,
    @Inject(jwtConfigEnv.KEY) private jwtConfig: JwtConfig,
  ) {}

  async signinUser(data: UserSigninDto) {
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
        avatarUrl: user.avatarUrl,
        role: 'client',
      });
    }
    return { user, accessToken: accessToken, refreshToken: refreshToken };
  }

  async signupClient(data: ClientSignupDto) {
    try {
      await this.clientService.findOneBy({
        email: data.email,
      });
      throw new ClientAlreadyExistsException();
    } catch (error) {
      if (!(error instanceof ClientNotFoundException)) {
        throw error;
      }
    }

    const client = await this.clientService.create(data as CreateClientDto);
    const [accessToken, refreshToken] = await this._getJWTTokens({
      sub: client.id,
      email: client.email,
      fullName: client.fullName,
      avatarUrl: client.avatarUrl,
      role: 'client',
    });
    return { client, accessToken: accessToken, refreshToken: refreshToken };
  }

  async refreshToken(user: User) {
    // const user = await this.userService.findOneBy({ id: userId });
    let payload: JwtPayload;
    if (user instanceof ClientModel) {
      payload = {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: 'client',
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
    filters: FindOptionsWhere<User | null>,
  ) {
    let user: User | null = null;
    try {
      user = await this.clientService.findOneBy(filters);
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
