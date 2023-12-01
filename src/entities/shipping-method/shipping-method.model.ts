import { BaseModel } from '../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopOrderModel } from '../shop-order/shop-order.model';

// like: stardard, priority, express or whatever options are defined
@Entity({ name: 'shipping_method' })
export class ShippingMethodModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.shippingMethod)
  shopOrders: ShopOrderModel[] | null;
}
