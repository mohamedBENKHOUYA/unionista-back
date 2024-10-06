import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductModel } from './product.model';
import { IPageOptions } from '@src/shared/paginator/dtos/page-options';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('productsi')
export class ProductController {
  private readonly logger = new Logger('product');

  @Get()
  @ApiOkResponse({
    type: ProductModel,
  })
  @ApiBadRequestResponse({
    description: '',
  })
  getAll(@Query() query: IPageOptions) {
    this.logger.log('GET products', 'access')
  }

  @Post()
  @ApiOkResponse({
    type: ProductModel
  })
  create(@Body() data: CreateProductDto) {
    
  }


}
