import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PromotionModel } from '../promotion/promotion.model';
import { ProductModel } from '../product/product.model';
import { VariationModel } from '../variation/variation.model';

@Entity('product_category')
export class ProductCategoryModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_name' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'image_path', nullable: true })
  imagePath: string;

  @Column({ name: 'parent_category_id' })
  parentCategoryId: string;
  @ManyToOne(() => ProductCategoryModel, {})
  @JoinColumn({
    name: 'parent_category_id',
  })
  parentCategory: ProductCategoryModel;

  @ManyToMany(() => PromotionModel, (promotion) => promotion.productCategories)
  promotions: PromotionModel[];

  // @ManyToMany(() => VariationModel, (variation) => variation.products)
  // @JoinTable({ name: 'productcategory_variation_relation' })
  // variations: VariationModel[];

  @OneToMany(() => VariationModel, (variation) => variation.productCategory)
  variations: VariationModel[] | null;

  @OneToMany(() => ProductModel, (product) => product.category)
  products: ProductModel[] | null;

  @OneToMany(
    () => ProductCategoryModel,
    (productCategory) => productCategory.parentCategory,
  )
  childCategories: ProductCategoryModel[] | null;
}
