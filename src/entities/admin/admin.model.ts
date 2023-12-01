import { BaseModel } from '../../shared/base-model';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class AdminModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
