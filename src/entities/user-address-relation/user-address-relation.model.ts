import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressModel } from '../address/address.model';
import { UserModel } from '../user/user.model';

@Entity({ name: 'user_address_relation' })
export class UserAddressRelationModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AddressModel)
  @JoinColumn({ name: 'address_id' })
  address: AddressModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column({ name: 'is_default', type: 'boolean' })
  isDefault: boolean;
}
