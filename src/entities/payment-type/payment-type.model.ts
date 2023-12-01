import { BaseModel } from '../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPaymentMethodModel } from '../user-payment-method/user-payment-method.model';

// examples: credit-card, paypal...or other payment types we want to support.
@Entity({ name: 'payment_type' })
export class PaymentTypeModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @OneToMany(
    () => UserPaymentMethodModel,
    (userPaymentMethod) => userPaymentMethod.paymentType,
  )
  userPaymentMethods: UserPaymentMethodModel[] | null;
}
