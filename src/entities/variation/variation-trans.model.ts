import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { VariationModel } from './variation.model';
import { ESupportedLocales } from '@src/shared/paginator/dtos/page-options';

@Entity({ name: 'variation_translation' })
export class VariationTranslation {
  @PrimaryColumn({ name: 'variation_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: ESupportedLocales })
  locale: ESupportedLocales;

  @Column()
  name: string;

  @ManyToOne(
    () => VariationModel,
    (variation: VariationModel) => variation.translations,
  )
  @JoinColumn({ name: 'variation_id' })
  variation: VariationModel;
}
