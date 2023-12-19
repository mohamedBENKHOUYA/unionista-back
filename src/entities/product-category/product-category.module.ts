import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModel } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryTranslation } from './product-category-trans.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryModel,
      ProductCategoryTranslation,
    ]),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
