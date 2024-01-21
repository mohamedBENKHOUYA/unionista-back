import { Express } from 'express';
import { Multer } from 'multer';

export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userAvatarFile: Express.Multer.File | null;
}
