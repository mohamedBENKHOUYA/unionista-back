import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModel } from './admin.model';
import AdminController from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from '@src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([AdminModel]), forwardRef(() => AuthModule)],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})
export default class AdminModule {}
