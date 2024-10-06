import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from '../product/product.model';
import { VariationOptionModel } from '../variation-option/variation-option.model';
import { OrderLineModel } from '../order-line/order-line.model';
import { ShoppingCartItemModel } from '../shopping-cart-item/shopping-cart-item.model';

@Entity({ name: 'product_item' })
export class ProductItemModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ name: 'quantity_in_stock', default: 0 })
  quantityInStock: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  price: number;

  @Column({ name: 'product_id' })
  productId: string;
  @ManyToOne(() => ProductModel)
  @JoinColumn({ name: 'product_id' })
  product: ProductModel;

  @ManyToMany(
    () => VariationOptionModel,
    (variationOption) => variationOption.productItems,
  )
  @JoinTable({
    name: 'productitem_variationoption_relation',
    joinColumn: {
      name: 'product_item_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'variation_option_id',
      referencedColumnName: 'id',
    },
  })
  variationOptions: VariationOptionModel[];

  @OneToMany(() => OrderLineModel, (orderLine) => orderLine.productItem)
  productItems: ProductItemModel[] | null;

  @OneToMany(
    () => ShoppingCartItemModel,
    (shoppingCartItem) => shoppingCartItem.productItem,
  )
  shoppingCartItems: ShoppingCartItemModel[] | null;
}
