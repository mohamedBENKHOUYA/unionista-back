import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PaymentTypeModel } from './payment-type.model';
import { SupportedLocales } from '../../shared/base-model';

@Entity({ name: 'payment_type_translation' })
export class PaymentTypeTranslation {
  @PrimaryColumn({ name: 'payment_type_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: SupportedLocales })
  locale: SupportedLocales;

  @Column()
  name: string;

  @ManyToOne(
    () => PaymentTypeModel,
    (paymentType: PaymentTypeModel) => paymentType.translations,
  )
  @JoinColumn({ name: 'payment_type_id' })
  paymentType: PaymentTypeModel;
}
