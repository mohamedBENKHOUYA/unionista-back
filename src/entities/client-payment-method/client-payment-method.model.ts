import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentTypeModel } from '../payment-type/payment-type.model';
import { ShopOrderModel } from '../shop-order/shop-order.model';
import { ClientModel } from '../user/client/client.model';

@Entity({ name: 'client_payment_method' })
export class ClientPaymentMethodModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Master card or ViSA or other campany that provides the payment.
  @Column()
  provider: string;

  @Column({ name: 'account_number' })
  accountNumber: string;

  @Column({ name: 'expiry_date', type: 'date' })
  expiryDate: Date;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault: boolean;

  //   relationships:
  @Column({ name: 'payment_type_id' })
  paymentTypeId: string;
  @ManyToOne(() => PaymentTypeModel)
  @JoinColumn({ name: 'payment_type_id' })
  paymentType: PaymentTypeModel;

  @Column({ name: 'client_id' })
  clientId: string;
  @ManyToOne(() => ClientModel)
  @JoinColumn({ name: 'client_id' })
  client: ClientModel;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.clientPaymentMethod)
  shopOrders: ShopOrderModel[] | null;
}
