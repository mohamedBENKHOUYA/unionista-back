import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryModel } from '../country/country.model';
import { ShopOrderModel } from '../shop-order/shop-order.model';
import { UserAddressRelationModel } from '../user-address-relation/user-address-relation.model';

@Entity({ name: 'address' })
export class AddressModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'address_line1' })
  addressLine1: string;

  @Column({ name: 'address_line2', nullable: true })
  addressLine2: string;

  @Column()
  city: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ name: 'country_id' })
  countryId: string;

  @ManyToOne(() => CountryModel)
  @JoinColumn({ name: 'country_id' })
  country: CountryModel;

  @OneToMany(
    () => UserAddressRelationModel,
    (userAddressRelation) => userAddressRelation.address,
  )
  userAddressRelations: UserAddressRelationModel[] | null;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.shippingAddress)
  shopOrders: ShopOrderModel[] | null;
}
