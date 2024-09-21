import { Exclude } from 'class-transformer';
import { BaseModel } from '@src/shared/base-model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class AdminModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'avatar_url' })
  avatarUrl: string;
}
