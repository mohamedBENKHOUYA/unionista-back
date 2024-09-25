import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryTranslation } from './product-category-trans.model';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryModel } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
import { AuthModule } from '@src/auth/auth.module';
import { ClientModule } from '../user/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryModel,
      ProductCategoryTranslation,
    ]),
    ClientModule,
    AuthModule,
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
