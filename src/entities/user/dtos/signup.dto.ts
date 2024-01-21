import { ApiProperty } from '@nestjs/swagger';
import { object, string } from 'yup';
import { Express } from 'express';
import { Multer } from 'multer';

export class SignupDto {
  @ApiProperty({
    description: 'User fullname',
  })
  fullName: string;

  @ApiProperty({
    description: 'User email',
  })
  email: string;
  @ApiProperty({
    description: 'User plain password',
  })
  password: string;

  @ApiProperty({ nullable: true, description: 'User phone number' })
  phoneNumber?: string;

  @ApiProperty({ nullable: true, description: 'User profile avatar' })
  userAvatarFile: Express.Multer.File | null;
}

export const signupSchema = object({
  fullName: string().required().min(4),
  email: string().email().required(),
  password: string().required().min(8),
  phoneNumber: string(),
});
