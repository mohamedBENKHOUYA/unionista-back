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
import { ProductItemModel } from '../product-item/product-item.model';

import { UserReviewModel } from '../user-review/user-review.model';
import { ProductTranslation } from './product-trans.model';

@Entity('product')
export class ProductModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'image_path', nullable: true })
  imagePath: string;

  @Column({ name: 'category_id' })
  categoryId: string;
  @ManyToOne(() => ProductCategoryModel)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategoryModel;

  //   @ManyToMany(() => VariationModel, (variation) => variation.products)
  //   @JoinTable({ name: 'product_variation_relation' })
  //   variations: VariationModel[];

  @OneToMany(() => UserReviewModel, (userReview) => userReview.product)
  userReviews: UserReviewModel[] | null;

  @OneToMany(() => ProductItemModel, (productItem) => productItem.product)
  productItems: ProductItemModel[] | null;

  @OneToMany(
    () => ProductTranslation,
    (productTranslation) => productTranslation.product,
  )
  translations: ProductTranslation[] | null;
}
