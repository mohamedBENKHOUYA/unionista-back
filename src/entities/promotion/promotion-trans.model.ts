import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PromotionModel } from './promotion.model';
import { SupportedLocales } from '../../shared/base-model';

@Entity({ name: 'promotion_translation' })
export class PromotionTranslation {
  @PrimaryColumn({ name: 'promotion_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: SupportedLocales })
  locale: SupportedLocales;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(
    () => PromotionModel,
    (promotion: PromotionModel) => promotion.translations,
  )
  @JoinColumn({ name: 'promotion_id' })
  promotion: PromotionModel;
}
