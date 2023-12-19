import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ShippingMethodModel } from './shipping-method.model';
import { ESupportedLocales } from '../../shared/paginator/dtos/page-options';

@Entity({ name: 'shipping_method_translation' })
export class ShippingMethodTranslation {
  @PrimaryColumn({ name: 'shipping_method_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: ESupportedLocales })
  locale: ESupportedLocales;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(
    () => ShippingMethodModel,
    (shippingMethod: ShippingMethodModel) => shippingMethod.translations,
  )
  @JoinColumn({ name: 'shipping_method_id' })
  shippingMethod: ShippingMethodModel;
}
