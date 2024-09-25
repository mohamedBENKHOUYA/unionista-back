import { Controller, Get, HttpCode, Logger, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { Serialize } from '@src/shared/interceptors/serialize.interceptor';
import { AdminOutgoingDto } from './dtos/admin-outgoing.dto';
import { AdminService } from './admin.service';
import { JwtAccessGuard } from '@src/auth/guards/jwt-access.guard';

@UseGuards(JwtAccessGuard, new RolesGuard(['admin']))
@Controller('admins')
export default class AdminController {
  private readonly logger = new Logger('admin');
  constructor(private adminService: AdminService) {}
  @HttpCode(200)
  @ApiOperation({ summary: 'List all admin' })
  @ApiOkResponse({
    description: 'List all admins',
  })
  @Serialize(AdminOutgoingDto)
  @Get()
  async list() {
    this.logger.log('GET list of admins', 'access');
    return this.adminService.findAll();
  }
}
