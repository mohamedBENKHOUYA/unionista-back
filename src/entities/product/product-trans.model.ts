import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ProductModel } from './product.model';
import { SupportedLocales } from '../../shared/base-model';

@Entity({ name: 'product_translation' })
export class ProductTranslation {
  @PrimaryColumn({ name: 'product_id' })
  id: string;

  @PrimaryColumn({ name: 'locale', type: 'enum', enum: SupportedLocales })
  locale: SupportedLocales;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(
    () => ProductModel,
    (product: ProductModel) => product.translations,
  )
  @JoinColumn({ name: 'product_id' })
  product: ProductModel;
}
