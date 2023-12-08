import { BaseModel } from '../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopOrderModel } from '../shop-order/shop-order.model';
import { OrderStatusTranslation } from './order-status-trans.model';

@Entity({ name: 'order_status' })
export class OrderStatusModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.orderStatus)
  shopOrders: ShopOrderModel[] | null;

  @OneToMany(
    () => OrderStatusTranslation,
    (orderStatusTranslation) => orderStatusTranslation.orderStatus,
  )
  translations: OrderStatusTranslation[] | null;
}
