import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { ClientModel } from '@src/entities/user/client/client.model';
import {
  ClientSignupDto,
  clientSignupSchema,
} from '@src/entities/user/client/dtos/client-signup.dto';
import {
  UserSigninDto,
  userSigninSchema,
} from '@src/entities/user/dtos/user-signin.dto';
import { Serialize } from '@src/shared/interceptors/serialize.interceptor';
import { YupPipe } from '@src/utils/joi.pipe';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { UserOutgoingDto } from '@src/entities/user/dtos/user-outgoing.dto';
import { ClientOutgoingDto } from '@src/entities/user/client/dtos/client-outgoing.dto';

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
  async signin(@Body(new YupPipe(userSigninSchema)) data: UserSigninDto) {
    this.logger.log('POST signin-user/', 'access');
    const signedUser = await this.authService.signinUser(data);
    return signedUser;
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Client sign up' })
  @ApiOkResponse({
    description: 'the client has been successfully signed up',
  })
  @Serialize(ClientOutgoingDto)
  @Post('/signup')
  @UseInterceptors(FileInterceptor('avatarFile'))
  async signup(
    @Body(new YupPipe(clientSignupSchema)) data: ClientSignupDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ) {
    this.logger.log('POST signup-client/', 'access');
    data.avatarFile = avatarFile;
    return this.authService.signupClient(data);
  }

  @UseGuards(JwtAccessGuard)
  @Post('/signout')
  signout(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  refreshTokens(@Req() req: Request) {
    return this.authService.refreshToken(req.user);
  }
}
