import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
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
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAccessGuard, new RolesGuard(['admin']))
@Controller('product-category')
export class ProductCategoryController {
  private readonly logger = new Logger('product-category');
  constructor(private productCategoryService: ProductCategoryService) {}

  @ApiOkResponse({
    type: ProductCategoryModel,
  })
  @ApiBadRequestResponse({
    description: '',
  })
  @Serialize(ProductCategoryOutoingDto)
  @Get()
  async list(@Query() queryOptions: IPageOptions) {
    for (let key of Object.keys(queryOptions)) {
      try {
        // check if object
        if (
          JSON.parse(Object.prototype.toString.call(queryOptions[key])) ===
          '[object Object]'
        ) {
          queryOptions[key] = JSON.parse(queryOptions[key]);
        }
      } catch (_) {
        if (Array.isArray(queryOptions[key]) && queryOptions[key].length) {
          // check if array of objects
          for (let i = 0; i < queryOptions[key].length; i++) {
            try {
              if (
                Object.prototype.toString.call(
                  JSON.parse(queryOptions[key][i]),
                ) === '[object Object]'
              ) {
                queryOptions[key][i] = JSON.parse(queryOptions[key][i]);
              }
            } catch (_) {}
          }
        } else {
          if (!isNaN(Number(key))) {
            queryOptions[key] = Number(key);
          } else if (queryOptions[key] == 'true') {
            queryOptions[key] = true;
          } else if (queryOptions[key] === 'false') {
            queryOptions[key] = false;
          } else {
            switch (queryOptions[key]) {
              case 'undefined':
                queryOptions[key] = undefined;
                break;
              case 'null':
                queryOptions[key] = null;
                break;
            }
          }
        }
      }
    }
    this.logger.log('GET product-category/', 'access');
    return this.productCategoryService.list(queryOptions);
  }

  @Post()
  @ApiOkResponse({
    type: ProductCategoryModel,
  })
  @UseInterceptors(FileInterceptor('image_file'))
  create(
    @Body(new YupPipe(createProductCategorySchema))
    data: CreateProductCategoryDto,
    @Query() options: IPageOptions,
    @UploadedFile() imageFile?: Express.Multer.File,
  ) {
    this.logger.log('POST product-category/', 'access');
    data.imageFile = imageFile;
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
