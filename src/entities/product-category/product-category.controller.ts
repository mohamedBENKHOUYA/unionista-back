import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductCategoryModel } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
import { YupPipe } from '@src/utils/joi.pipe';
import {
  CreateProductCategoryDto,
  createProductCategorySchema,
} from './dtos/create-product-category.dto';
import { IPageOptions } from '@src/shared/paginator/dtos/page-options';
import { Serialize } from '@src/shared/interceptors/serialize.interceptor';
import { ProductCategoryOutoingDto } from './dtos/product-category-outgoing.dto';
import { ParseInterceptor } from '@src/shared/interceptors/parse.interceptor';
import { JwtAccessGuard } from '@src/auth/guards/jwt-access.guard';

@Controller('product-category')
export class ProductCategoryController {
  private readonly logger = new Logger('product-category');
  constructor(private productCategoryService: ProductCategoryService) {}

  @UseInterceptors(new ParseInterceptor())
  @Serialize(ProductCategoryOutoingDto)
  @UseGuards(JwtAccessGuard)
  @Get()
  @ApiOkResponse({
    type: ProductCategoryModel,
  })
  @ApiBadRequestResponse({
    description: '',
  })
  list(@Query() queryOptions: IPageOptions) {
    return this.productCategoryService.list(queryOptions);
  }

  @Post()
  @ApiOkResponse({
    type: ProductCategoryModel,
  })
  createProductCategory(
    @Body(new YupPipe(createProductCategorySchema))
    data: CreateProductCategoryDto,
    @Query() options: IPageOptions,
  ) {
    this.logger.log('POST product-category/', 'access');

    return this.productCategoryService.create(data, options);
  }

  @UseInterceptors(new ParseInterceptor())
  @Serialize(ProductCategoryOutoingDto)
  @Get('/:id')
  findOneProductCategory(
    @Param('id') id: string,
    @Query() queryOptions: IPageOptions,
  ) {
    this.logger.log('GET findOneProductCategory', 'access');

    return this.productCategoryService.find({
      id,
      locale: queryOptions.locale,
    });
  }
}
