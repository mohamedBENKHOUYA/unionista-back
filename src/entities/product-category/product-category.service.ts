import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductCategoryModel } from './product-category.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryModel)
    private productCategoryRepository: Repository<ProductCategoryModel>,
  ) {}

  list() {
    return this.productCategoryRepository.find();
  }
}
