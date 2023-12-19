import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderStatusModel } from './order-status.model';
import { ESupportedLocales } from '../../shared/paginator/dtos/page-options';

enum OrderStatus {
  PENDING = 'pending',
  FULFILLMENT = 'fulfillment',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DECLINED = 'declined',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially-refunded',
  DISPUTED = 'disputed',
}

@Entity('order_status_translation')
export class OrderStatusTranslation {
  @PrimaryColumn({ name: 'order_status_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: ESupportedLocales })
  locale: ESupportedLocales;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ManyToOne(
    () => OrderStatusModel,
    (orderStatus: OrderStatusModel) => orderStatus.translations,
  )
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatusModel;
}
