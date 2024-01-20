import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserNotFoundException } from '@src/exceptions/http-exceptions/UserNotFoundException';
import {
  JwtConfig,
  JwtPayload,
  jwtConfig as jwtConfigEnv,
} from '@src/config/jwt.config';
import { sign, verify } from 'jsonwebtoken';
import { SignupDto } from './dtos/signup.dto';
import { UserAlreadyExistsException } from '@src/exceptions/http-exceptions/UserAlreadyExistsException';
import { hash, compareSync, genSalt } from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { join } from 'path';

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
      emailAddress: data.email,
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
