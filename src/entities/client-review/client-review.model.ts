import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from '../product/product.model';
import { ClientModel } from '../user/client/client.model';

@Entity({ name: 'client_review' })
export class ClientReviewModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rating_value' })
  ratingValue: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ name: 'client_id' })
  clientId: string;
  @ManyToOne(() => ClientModel)
  @JoinColumn({ name: 'client_id' })
  client: ClientModel;

  @Column({ name: 'product_id' })
  productId: string;
  @ManyToOne(() => ProductModel)
  @JoinColumn({ name: 'product_id' })
  product: ProductModel;
}
