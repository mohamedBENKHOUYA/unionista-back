import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SigninDto, signinSchema } from './dtos/signin.dto';
import { JoiPipe } from '@src/utils/joi.pipe';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from '@src/entities/user/user.service';
import { signupSchema, SignupDto } from './dtos/signup.dto';
import * as fs from 'fs';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller('user')
export class UserController {
  private readonly logger = new Logger('user');
  constructor(private userService: UserService) {
    console.log();
  }

  // @Get('/videos/:id')
  // getVideo(@Res({ passthrough: false }) res: Response, @Req() req: Request) {
  //   const id = req.params.id;
  //   const filePath = join('/srv/back/src/videos/lmokawil.mp4');

  //   const stats = fs.statSync(filePath);

  //   const fileSize = stats.size;
  //   const range = req.headers.range;
  //   if (!range) {
  //     const head = {
  //       'Content-Length': fileSize,
  //       'Content-Type': 'video/mp4',
  //     };
  //     res.writeHead(200, head);
  //     fs.createReadStream(filePath).pipe(res);
  //   }
  //   const parts = range
  //     .replace(/bytes=/, '')
  //     .split('-')
  //     .map((el) => parseInt(el.trim()));

  //   console.log('range: ', range, 'parts: ', parts, 'fileszi: ', fileSize);

  //   let [start, end] = parts;
  //   end = end || fileSize - 1;

  //   const chunksize = end - start + 1;
  //   const head = {
  //     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': chunksize,
  //     'Content-Type': 'video/mp4',
  //   };
  //   res.writeHead(206, head);
  //   fs.createReadStream(filePath, { start, end }).pipe(res);
  // }

  @Post('/signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({
    description: 'The user has been successfully signed in',
  })
  async signin(
    @Body(new JoiPipe(signinSchema)) data: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('POST signin-user/', 'access');

    const signedUser = await this.userService.signin(data);
    res.setHeader('Set-Cookie', `auth=${signedUser.token}; HttpOnly; Secure;`);
    return signedUser;
  }

  @Post('/signup')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign up' })
  @ApiOkResponse({
    description: 'the user has been successfully signed up',
  })
  async signup(@Body(new JoiPipe(signupSchema)) data: SignupDto) {
    this.logger.log('POST signup-user/', 'access');
    return this.userService.signup(data);
  }

  @Post('/signout')
  signout() {
    console.log('signout');
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'list all users' })
  @ApiOkResponse({
    description: 'List all users',
  })
  async list() {
    this.logger.log('GET list of users', 'access');
    return this.userService.list();
  }
}
