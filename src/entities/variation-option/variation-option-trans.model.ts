import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { VariationOptionModel } from './variation-option.model';
import { SupportedLocales } from '../../shared/base-model';

@Entity({ name: 'variation_option_translation' })
export class VariationOptionTranslation {
  @PrimaryColumn({ name: 'variation_option_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: SupportedLocales })
  locale: SupportedLocales;

  @Column()
  value: string;

  @ManyToOne(
    () => VariationOptionModel,
    (variationOption: VariationOptionModel) => variationOption.translations,
  )
  @JoinColumn({ name: 'variation_option_id' })
  variationOption: VariationOptionModel;
}
