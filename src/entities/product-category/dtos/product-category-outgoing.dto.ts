import { Exclude, Expose, Transform } from 'class-transformer';
import { ProductCategoryModel } from '../product-category.model';

export class ProductCategoryOutoingDto {
  // @Transform(({ obj }) => {
  //   if (obj.translations) {
  //     return obj.translations[0];
  //   }
  // })
  // translations: [];

  // @Exclude()
  // children: ProductCategoryModel[];

  // @Transform(({ obj }) => {
  //   return !!obj.children.length;
  // })
  // @Expose()
  // hasChildren: boolean;
}
