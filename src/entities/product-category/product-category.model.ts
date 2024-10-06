import { BaseModel } from '../../shared/base-model';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PromotionModel } from '../promotion/promotion.model';
import { ProductModel } from '../product/product.model';
import { VariationModel } from '../variation/variation.model';
import { ProductCategoryTranslation } from './product-category-trans.model';

@Entity('product_category')
export class ProductCategoryModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ unique: true })
  slug: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;
  @ManyToOne(() => ProductCategoryModel)
  @JoinColumn({
    name: 'parent_id',
  })
  parent: ProductCategoryModel;

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
    (productCategory) => productCategory.parent,
  )
  children: ProductCategoryModel[] | null;

  @OneToMany(
    () => ProductCategoryTranslation,
    (productCategoryTranslation) => productCategoryTranslation.productCategory,
    { eager: true },
  )
  translations: ProductCategoryTranslation | null;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  transform?() {
    if (this.translations) {
      this.translations = this.translations[0];
    }
  }
}
