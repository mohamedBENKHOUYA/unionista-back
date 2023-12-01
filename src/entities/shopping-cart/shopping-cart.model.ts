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
import { UserModel } from '../user/user.model';

@Entity({ name: 'shopping_cart' })
export class ShoppingCartModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @OneToMany(
    () => ShoppingCartItemModel,
    (shoppingCartItem) => shoppingCartItem.shoppingCart,
  )
  shoppingCartItems: ShoppingCartItemModel[] | null;
}
