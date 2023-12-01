import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductCategoryModel } from './product-category.model';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Get()
  @ApiOkResponse({
    type: ProductCategoryModel,
  })
  @ApiBadRequestResponse({
    description: '',
  })
  list() {
    return this.productCategoryService.list();
  }
}
