import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProductCategoryTranslation } from './product-category-trans.model';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryModel } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryModel,
      ProductCategoryTranslation,
    ]),
    UserModule,
    AuthModule
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
