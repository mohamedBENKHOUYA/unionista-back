import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtConfig, jwtConfig as jwtConfigEnv } from '@src/config/jwt.config';
import { genSalt, hash } from 'bcrypt';
import { join } from 'path';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ClientModel } from './client.model';
import { CreateClientDto } from './dtos/create-client.dto';
import { ClientNotFoundException } from '@src/exceptions/http-exceptions/ClientNotFoundException';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientModel)
    private clientRepository: Repository<ClientModel>,
    @Inject(jwtConfigEnv.KEY) private readonly jwtConfig: JwtConfig,
  ) {}

  async list() {
    return this.clientRepository.find();
  }

  async findOneBy(filters: FindOptionsWhere<ClientModel>) {
    const found = await this.clientRepository.findOneBy(filters);
    if (!found) {
      throw new ClientNotFoundException();
    }
    return found;
  }

  async create(data: CreateClientDto) {
    const client = this.clientRepository.create({
      fullName: data.fullName,
      email: data.email,
      password: await hash(data.password, await genSalt()),
      phone: data.phone,
    });
    client.avatarUrl = join('../../..', 'files', data.avatarFile.originalname);
    return this.clientRepository.save(client);
  }
}
