import { BaseModel } from '../../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopOrderModel } from '../../shop-order/shop-order.model';
import { Exclude } from 'class-transformer';
import { ClientReviewModel } from '../../client-review/client-review.model';
import { ClientAddressRelationModel } from '../../client-address-relation/client-address-relation.model';
import { ClientPaymentMethodModel } from '@src/entities/client-payment-method/client-payment-method.model';

@Entity('client')
export class ClientModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email' })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string | null;

  @OneToMany(
    () => ClientAddressRelationModel,
    (clientAddressRelation) => clientAddressRelation.client,
  )
  clientAddressRelations: ClientAddressRelationModel[] | null;

  @OneToMany(
    () => ClientPaymentMethodModel,
    (clientPaymentMethod) => clientPaymentMethod.client,
  )
  clientPaymentMethods: ClientPaymentMethodModel[] | null;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.client)
  shopOrders: ShopOrderModel[] | null;

  @OneToMany(() => ClientReviewModel, (clientReview) => clientReview.client)
  clientReview: ClientReviewModel[] | null;
}
