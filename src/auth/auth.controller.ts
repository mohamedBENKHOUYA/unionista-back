import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { SigninDto, signinSchema } from '@src/entities/user/dtos/signin.dto';
import { SignupDto, signupSchema } from '@src/entities/user/dtos/signup.dto';
import { UserOutgoingDto } from '@src/entities/user/dtos/user-outgoing.dto';
import { UserService } from '@src/entities/user/user.service';
import { Serialize } from '@src/shared/interceptors/serialize.interceptor';
import { YupPipe } from '@src/utils/joi.pipe';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Request } from 'express';
import { UserModel } from '@src/entities/user/user.model';

@Controller('auth')
export class AuthController {
  logger = new Logger();
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({
    description: 'The user has been successfully signed in',
  })
  @Serialize(UserOutgoingDto)
  @Post('/signin')
  async signin(@Body(new YupPipe(signinSchema)) data: SigninDto) {
    this.logger.log('POST signin-user/', 'access');
    const signedUser = await this.authService.signin(data);
    // res.setHeader('Set-Cookie', `auth=${signedUser.token}; HttpOnly; Secure;`);
    return signedUser;
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Sign up' })
  @ApiOkResponse({
    description: 'the user has been successfully signed up',
  })
  @Serialize(UserOutgoingDto)
  @Post('/signup')
  async signup(@Body(new YupPipe(signupSchema)) data: SignupDto) {
    this.logger.log('POST signup-user/', 'access');
    return this.authService.signup(data);
  }

  @UseGuards(JwtAccessGuard)
  @Post('/signout')
  signout(@Req() req) {
    console.log('signout');
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request & { user: UserModel }) {
    return this.authService.refreshTokens(req.user);
  }
}
