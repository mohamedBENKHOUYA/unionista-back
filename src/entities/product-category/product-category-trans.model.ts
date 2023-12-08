import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductCategoryModel } from './product-category.model';
import { SupportedLocales } from '../../shared/base-model';

@Entity({ name: 'product_category_translation' })
export class ProductCategoryTranslation {
  @PrimaryColumn({ name: 'product_category_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: SupportedLocales })
  locale: SupportedLocales;

  @Column({ name: 'category_name' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(
    () => ProductCategoryModel,
    (productCategory: ProductCategoryModel) => productCategory.translations,
  )
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategoryModel;
}
