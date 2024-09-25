import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingCartItemModel } from '../shopping-cart-item/shopping-cart-item.model';
import { ClientModel } from '../user/client/client.model';

@Entity({ name: 'shopping_cart' })
export class ShoppingCartModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => ClientModel)
  @JoinColumn({ name: 'client_id' })
  client: ClientModel;

  @OneToMany(
    () => ShoppingCartItemModel,
    (shoppingCartItem) => shoppingCartItem.shoppingCart,
  )
  shoppingCartItems: ShoppingCartItemModel[] | null;
}
