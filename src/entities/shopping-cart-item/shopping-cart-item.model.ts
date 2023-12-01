import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductItemModel } from '../product-item/product-item.model';
import { ShoppingCartModel } from '../shopping-cart/shopping-cart.model';

@Entity({ name: 'shopping_cart_item' })
export class ShoppingCartItemModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({ name: 'product_item_id' })
  productItemId: string;
  @ManyToOne(() => ProductItemModel)
  @JoinColumn({ name: 'product_item_id' })
  productItem: ProductItemModel;

  @Column({ name: 'shopping_cart_id' })
  shoppingCartId: string;
  @ManyToOne(() => ShoppingCartModel)
  @JoinColumn({ name: 'shopping_cart_id' })
  shoppingCart: ShoppingCartModel;
}
