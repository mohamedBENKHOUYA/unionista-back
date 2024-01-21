import { Express } from 'express';

export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userAvatarFile: Express.Multer.File | null;
}
