import { BaseModel } from '../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AddressModel } from '../address/address.model';

@Entity({ name: 'country' })
export class CountryModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'country_name' })
  countryName: string;

  @OneToMany(() => AddressModel, (address) => address.country)
  addresses: AddressModel[] | null;
}
