import { BaseModel } from '../../shared/base-model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopOrderModel } from '../shop-order/shop-order.model';

enum OrderStatus {
  ORDERED = 'ordered',
  IN_TRANSIT = 'in-transit',
  OUT_FOR_DELIVERY = 'out-for-delivery',
  DELIVERED = 'delivered',
}

@Entity({ name: 'order_status' })
export class OrderStatusModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.ORDERED })
  status: OrderStatus;

  @OneToMany(() => ShopOrderModel, (shopOrder) => shopOrder.orderStatus)
  shopOrders: ShopOrderModel[] | null;
}
