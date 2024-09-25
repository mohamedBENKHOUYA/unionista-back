import { BaseModel } from '@src/shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressModel } from '../address/address.model';
import { ClientModel } from '../user/client/client.model';

@Entity({ name: 'client_address_relation' })
export class ClientAddressRelationModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AddressModel)
  @JoinColumn({ name: 'address_id' })
  address: AddressModel;

  @ManyToOne(() => ClientModel)
  @JoinColumn({ name: 'client_id' })
  client: ClientModel;

  @Column({ name: 'is_default', type: 'boolean' })
  isDefault: boolean;
}
