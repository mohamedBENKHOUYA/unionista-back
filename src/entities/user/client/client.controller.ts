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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { YupPipe } from '@src/utils/joi.pipe';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import * as fs from 'fs';
import { Request, Response } from 'express';
import { join } from 'path';
import { Serialize } from '@src/shared/interceptors/serialize.interceptor';
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { JwtAccessGuard } from '@src/auth/guards/jwt-access.guard';
import { ClientModel } from './client.model';
import { ClientService } from './client.service';
import { ClientOutgoingDto } from './dtos/client-outgoing.dto';

@UseGuards(JwtAccessGuard)
@Controller('clients')
export class ClientController {
  private readonly logger = new Logger('client');
  constructor(private clientService: ClientService) {}

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

  @UseGuards(new RolesGuard(['admin']))
  @HttpCode(200)
  @ApiOperation({ summary: 'List all clients' })
  @ApiOkResponse({
    description: 'List all clients',
  })
  @Serialize(ClientOutgoingDto)
  @Get()
  async list() {
    this.logger.log('GET list of clients', 'access');
    return this.clientService.list();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get one client by id' })
  @ApiOkResponse({
    description: 'One client',
  })
  @Get(':id')
  async findClientById(@Param('id') id: string): Promise<ClientModel> {
    this.logger.log('GET one client by id', 'access');
    return this.clientService.findOneBy({ id: id });
  }
}
