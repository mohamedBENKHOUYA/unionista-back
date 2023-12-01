import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategoryModel } from '../product-category/product-category.model';

@Entity({ name: 'entity' })
export class PromotionModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

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
}
