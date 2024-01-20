import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { SigninDto, signinSchema } from './dtos/signin.dto';
import { YupPipe } from '@src/utils/joi.pipe';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from '@src/entities/user/user.service';
import { signupSchema, SignupDto } from './dtos/signup.dto';
import * as fs from 'fs';
import { Request, Response } from 'express';
import { join } from 'path';
import { Serialize } from '@src/shared/interceptors/serialize.interceptor';
import { UserOutgoingDto } from './dtos/user-outgoing.dto';
import { UserModel } from './user.model';

@Controller('users')
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

  @HttpCode(200)
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({
    description: 'List all users',
  })
  @Serialize(UserOutgoingDto)
  @Get()
  async list() {
    this.logger.log('GET list of users', 'access');
    return this.userService.list();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiOkResponse({
    description: 'One user',
  })
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<UserModel> {
    this.logger.log('GET one user by id', 'access');
    return this.userService.findOneBy({ id: id });
  }
}
