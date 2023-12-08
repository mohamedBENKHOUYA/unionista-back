import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategoryModel } from '../product-category/product-category.model';
import { VariationTranslation } from './variation-trans.model';

@Entity({ name: 'variation' })
export class VariationModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // relationships
  //   @ManyToMany(() => ProductModel, (product) => product.variations)
  //   products: ProductModel[];
  @Column({ name: 'product_category_id' })
  productCategoryId: string;
  @ManyToOne(() => ProductCategoryModel)
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategoryModel;

  @OneToMany(
    () => VariationTranslation,
    (variationTranslation) => variationTranslation.variation,
  )
  translations: VariationTranslation[] | null;
}
