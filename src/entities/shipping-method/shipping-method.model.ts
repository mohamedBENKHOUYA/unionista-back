import { BaseModel } from '../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopOrderModel } from '../shop-order/shop-order.model';
import { ShippingMethodTranslation } from './shipping-method-trans.model';

// like: stardard, priority, express or whatever options are defined
@Entity({ name: 'shipping_method' })
export class ShippingMethodModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.shippingMethod)
  shopOrders: ShopOrderModel[] | null;

  @OneToMany(
    () => ShippingMethodTranslation,
    (shippingMethodTranslation) => shippingMethodTranslation.shippingMethod,
  )
  translations: ShippingMethodTranslation[] | null;
}
