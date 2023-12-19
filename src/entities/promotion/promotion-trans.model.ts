import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PromotionModel } from './promotion.model';
import { ESupportedLocales } from '../../shared/paginator/dtos/page-options';

@Entity({ name: 'promotion_translation' })
export class PromotionTranslation {
  @PrimaryColumn({ name: 'promotion_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: ESupportedLocales })
  locale: ESupportedLocales;

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
