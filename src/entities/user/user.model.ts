import { BaseModel } from '../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPaymentMethodModel } from '../user-payment-method/user-payment-method.model';
import { ShopOrderModel } from '../shop-order/shop-order.model';
import { UserReviewModel } from '../user-review/user-review.model';
import { UserAddressRelationModel } from '../user-address-relation/user-address-relation.model';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email_address' })
  emailAddress: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'avatar_path', nullable: true })
  avatarPath: string | null;

  @OneToMany(
    () => UserAddressRelationModel,
    (userAddressRelation) => userAddressRelation.user,
  )
  userAddressRelations: UserAddressRelationModel[] | null;

  @OneToMany(
    () => UserPaymentMethodModel,
    (userPaymentMethod) => userPaymentMethod.user,
  )
  userPaymentMethods: UserPaymentMethodModel[] | null;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.user)
  shopOrders: ShopOrderModel[] | null;

  @OneToMany(() => UserReviewModel, (userReview) => userReview.user)
  userReview: UserReviewModel[] | null;
}
