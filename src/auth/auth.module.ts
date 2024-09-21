import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@src/entities/user/user.module';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@src/entities/user/user.model';
import { PassportModule } from '@nestjs/passport';
import AdminModule from '@src/entities/admin/admin.module';

@Module({
  imports: [UserModule, AdminModule, TypeOrmModule.forFeature([UserModel]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
