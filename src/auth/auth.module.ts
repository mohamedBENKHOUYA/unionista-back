import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminModule from '@src/entities/user/admin/admin.module';
import { ClientModule } from '@src/entities/user/client/client.module';

@Module({
  imports: [
    forwardRef(() => ClientModule),
    AdminModule,
    TypeOrmModule.forFeature([ClientModule]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
