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
import { UserModel } from '../user/user.model';
import { UserPaymentMethodModel } from '../user-payment-method/user-payment-method.model';
import { AddressModel } from '../address/address.model';
import { ShippingMethodModel } from '../shipping-method/shipping-method.model';
import { OrderStatusModel } from '../order-status/order-status.model';
import { OrderLineModel } from '../order-line/order-line.model';

@Entity({ name: 'shop_order' })
export class ShopOrderModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_date' })
  orderDate: Date;

  @Column({ name: 'order_total' })
  orderTotal: number;

  @Column({ name: 'user_id', nullable: true })
  userId: string;
  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column({ name: 'user_payment_method_id' })
  userPaymentMethodId: string;
  @ManyToOne(() => UserPaymentMethodModel)
  @JoinColumn({ name: 'user_payment_method_id' })
  userPaymentMethod: UserPaymentMethodModel;

  @Column({ name: 'shipping_address_id' })
  shippingAddressId: string;
  @ManyToOne(() => AddressModel)
  @JoinColumn({ name: 'shipping_address_id' })
  shippingAddress: AddressModel;

  @Column({ name: 'shopping_method_id' })
  shoppingMethodId: string;
  @ManyToOne(() => ShippingMethodModel)
  @JoinColumn({ name: 'shopping_method_id' })
  shippingMethod: ShippingMethodModel;

  @Column({ name: 'order_status_id' })
  orderStatusId: string;
  @ManyToOne(() => OrderStatusModel)
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatusModel;

  @OneToMany(() => OrderLineModel, (orderLine) => orderLine.order)
  orderLine: OrderLineModel[] | null;
}
