import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModel } from './admin.model';
import AdminController from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [TypeOrmModule.forFeature([AdminModel])],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]

})
export default class AdminModule {}
