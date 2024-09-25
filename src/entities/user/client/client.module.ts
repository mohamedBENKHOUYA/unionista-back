import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';
import { ClientModel } from './client.model';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientModel]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
