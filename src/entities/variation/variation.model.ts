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
import { ProductModel } from '../product/product.model';
import { ProductCategoryModel } from '../product-category/product-category.model';

@Entity({ name: 'variation' })
export class VariationModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // relationships
  //   @ManyToMany(() => ProductModel, (product) => product.variations)
  //   products: ProductModel[];
  @Column({ name: 'product_category_id' })
  productCategoryId: string;
  @ManyToOne(() => ProductCategoryModel)
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategoryModel;
}
