import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VariationModel } from '../variation/variation.model';
import { ProductItemModel } from '../product-item/product-item.model';

@Entity({ name: 'variation_option' })
export class VariationOptionModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @PrimaryColumn({ name: 'id_variation' })
  //   variationId: string;

  @Column()
  value: string;

  @Column({ name: 'variation_id' })
  variationId: string;
  @ManyToOne(() => VariationModel)
  @JoinColumn({ name: 'variation_id' })
  variation: VariationModel;

  @ManyToMany(
    () => ProductItemModel,
    (productItem) => productItem.variationOptions,
  )
  productItems: ProductItemModel[];
}
