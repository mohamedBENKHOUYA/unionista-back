import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductItemModel } from '../product-item/product-item.model';
import { ShopOrderModel } from '../shop-order/shop-order.model';

@Entity({ name: 'order_line' })
export class OrderLineModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ name: 'product_item_id' })
  productItemId: string;
  @ManyToOne(() => ProductItemModel)
  @JoinColumn({ name: 'product_item_id' })
  productItem: ProductItemModel;

  @Column({ name: 'order_id' })
  orderId: string;
  @ManyToOne(() => ShopOrderModel)
  @JoinColumn({ name: 'order_id' })
  order: ShopOrderModel;
}
