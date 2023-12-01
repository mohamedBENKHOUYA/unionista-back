import { BaseModel } from '../../shared/base-model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from '../user/user.model';
import { ProductModel } from '../product/product.model';

@Entity({ name: 'user_review' })
export class UserReviewModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rating_value' })
  ratingValue: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ name: 'user_id' })
  userId: string;
  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column({ name: 'product_id' })
  productId: string;
  @ManyToOne(() => ProductModel)
  @JoinColumn({ name: 'product_id' })
  product: ProductModel;
}
