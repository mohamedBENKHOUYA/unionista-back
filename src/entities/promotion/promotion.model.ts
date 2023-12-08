import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategoryModel } from '../product-category/product-category.model';
import { PromotionTranslation } from './promotion-trans.model';

@Entity({ name: 'promotion' })
export class PromotionModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'discount_rate' })
  discountRate: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @ManyToMany(
    () => ProductCategoryModel,
    (productCategory) => productCategory.promotions,
  )
  @JoinTable({ name: 'promotion_productcategory_relation' })
  productCategories: ProductCategoryModel[];

  @OneToMany(
    () => PromotionTranslation,
    (promotionTranslation) => promotionTranslation.promotion,
  )
  translations: PromotionTranslation[] | null;
}
