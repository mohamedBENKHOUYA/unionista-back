import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PaymentTypeModel } from './payment-type.model';
import { ESupportedLocales } from '../../shared/paginator/dtos/page-options';

@Entity({ name: 'payment_type_translation' })
export class PaymentTypeTranslation {
  @PrimaryColumn({ name: 'payment_type_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: ESupportedLocales })
  locale: ESupportedLocales;

  @Column()
  name: string;

  @ManyToOne(
    () => PaymentTypeModel,
    (paymentType: PaymentTypeModel) => paymentType.translations,
  )
  @JoinColumn({ name: 'payment_type_id' })
  paymentType: PaymentTypeModel;
}
