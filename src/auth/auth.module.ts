import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@src/entities/user/user.module';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@src/entities/user/user.model';
import { AccessJwtStrategy } from './strategies/access-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserModel]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
