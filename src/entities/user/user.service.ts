import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '@src/exceptions/http-exceptions/UserNotFoundException';
import { JwtConfig, jwtConfig as jwtConfigEnv } from '@src/config/jwt.config';
import { sign, verify } from 'jsonwebtoken';
import { SignupDto } from './dtos/signup.dto';
import { UserAlreadyExistsException } from '@src/exceptions/http-exceptions/UserAlreadyExistsException';
import { hash, compareSync, genSalt } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
    @Inject(jwtConfigEnv.KEY) private readonly jwtConfig: JwtConfig,
  ) {}

  async signin(data: SigninDto) {
    const user = await this.userRepository.findOneBy({
      emailAddress: data.email,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!compareSync(data.password, user.password)) {
      throw new UnauthorizedException();
    }
    const jwt = this._generateJWT({ email: user.emailAddress, id: user.id });
    const { password: _, ...newUser } = user;
    return { user: newUser, token: jwt };
  }

  async signup(data: SignupDto) {
    const existing = await this.userRepository.findOneBy({
      emailAddress: data.email,
    });
    if (existing) {
      throw new UserAlreadyExistsException();
    }

    const user = this.userRepository.create({
      fullName: data.fullName,
      emailAddress: data.email,
      password: await hash(data.password, await genSalt(10)),
      phoneNumber: data.phoneNumber,
    });
    await this.userRepository.save(user);
    const token = this._generateJWT({
      email: user.emailAddress,
      id: user.id,
    });
    const { password: _, ...newUser } = user;
    return {
      user: newUser,
      token,
    };
  }

  private _generateJWT(payload): string {
    const privateKey = this.jwtConfig.privateKey;
    return sign({ user: payload }, privateKey, {
      issuer: this.jwtConfig.issuer,
      expiresIn: this.jwtConfig.ttl,
      //   algorithm: 'RS256',
    });
  }
}
