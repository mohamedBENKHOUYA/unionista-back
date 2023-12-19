import { Exclude, Expose, Transform } from 'class-transformer';
import { ProductCategoryModel } from '../product-category.model';

export class ProductCategoryOutoingDto {
  @Transform(({ obj }) => {
    if (obj.translations) {
      return obj.translations[0];
    }
  })
  translations: [];

  @Exclude()
  childCategories: ProductCategoryModel[];

  @Transform(({ obj }) => {
    return !!obj.childCategories.length;
  })
  @Expose()
  hasChilds: boolean;
}
