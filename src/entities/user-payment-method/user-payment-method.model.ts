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
import { UserModel } from '../user/user.model';
import { ShopOrderModel } from '../shop-order/shop-order.model';

@Entity({ name: 'user_payment_method' })
export class UserPaymentMethodModel extends BaseModel {
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

  @Column({ name: 'user_id' })
  userId: string;
  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.userPaymentMethod)
  shopOrders: ShopOrderModel[] | null;
}
