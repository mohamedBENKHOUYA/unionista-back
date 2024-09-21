import {
  Inject,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  JwtConfig,
  jwtConfig as jwtConfigEnv
} from '@src/config/jwt.config';
import { UserNotFoundException } from '@src/exceptions/http-exceptions/UserNotFoundException';
import { genSalt, hash } from 'bcrypt';
import { join } from 'path';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
    @Inject(jwtConfigEnv.KEY) private readonly jwtConfig: JwtConfig,
  ) {}

  async list() {
    return this.userRepository.find();
  }

  async findOneBy(filters: FindOptionsWhere<UserModel>) {
    const found = await this.userRepository.findOneBy(filters);
    if (!found) {
      throw new UserNotFoundException();
    }
    return found;
  }

  async create(data: CreateUserDto) {
    const user = this.userRepository.create({
      fullName: data.fullName,
      email: data.email,
      password: await hash(data.password, await genSalt()),
      phoneNumber: data.phoneNumber,
    });
    user.avatarPath = join(
      '../../..',
      'files',
      data.userAvatarFile.originalname,
    );
    return this.userRepository.save(user);
  }
}
