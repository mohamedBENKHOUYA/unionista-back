import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BaseModel } from '../../shared/base-model';
import { AddressModel } from '../address/address.model';
import { ClientPaymentMethodModel } from '../client-payment-method/client-payment-method.model';
import { OrderLineModel } from '../order-line/order-line.model';
import { OrderStatusModel } from '../order-status/order-status.model';
import { ShippingMethodModel } from '../shipping-method/shipping-method.model';
import { ClientModel } from '../user/client/client.model';

@Entity({ name: 'shop_order' })
export class ShopOrderModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_date' })
  orderDate: Date;

  @Column({ name: 'order_total' })
  orderTotal: number;

  @Column({ name: 'client_id', nullable: true })
  clientId: string;
  @ManyToOne(() => ClientModel)
  @JoinColumn({ name: 'client_id' })
  client: ClientModel;

  @Column({ name: 'client_payment_method_id' })
  clientPaymentMethodId: string;
  @ManyToOne(() => ClientPaymentMethodModel)
  @JoinColumn({ name: 'client_payment_method_id' })
  clientPaymentMethod: ClientPaymentMethodModel;

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
