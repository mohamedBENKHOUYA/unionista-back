import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductCategoryModel } from './product-category.model';
import { ESupportedLocales } from '../../shared/paginator/dtos/page-options';

@Entity({ name: 'product_category_translation' })
export class ProductCategoryTranslation {
  @PrimaryColumn({ name: 'product_category_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: ESupportedLocales })
  locale: ESupportedLocales;

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
