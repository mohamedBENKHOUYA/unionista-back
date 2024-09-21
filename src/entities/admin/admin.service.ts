import { InjectRepository } from '@nestjs/typeorm';
import { AdminModel } from './admin.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { genSalt, hash } from 'bcrypt';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { AdminNotFoundException } from './exceptions/AdminNotFoundException';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminModel) private repository: Repository<AdminModel>,
  ) {}

  public findAll() {
    return this.repository.find();
  }

  public async findById(id: string) {
    const found = await this.repository.findOne({ where: { id } });
    if (!found) {
      throw new AdminNotFoundException();
    }
    return found;
  }

  public async findOne(filters: FindOptionsWhere<AdminModel>) {
    const admin = await this.repository.findOneBy(filters);
    if (!admin) {
      throw new AdminNotFoundException();
    }
    return admin;
  }

  public async create(data: CreateAdminDto) {
    const admin = this.repository.create({
      ...data,
      password: await hash(data.password, await genSalt()),
    });

    // Save to S3 and get url
    admin.avatarUrl = '';

    return this.repository.save(admin);
  }

  public async update(data: UpdateAdminDto) {}

  public async delete() {}

  public async count() {}

  public async findWithRelations() {}
}
