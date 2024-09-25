import { ApiProperty } from '@nestjs/swagger';
import { object, string } from 'yup';
import { Express } from 'express';

export class ClientSignupDto {
  @ApiProperty({
    description: 'Client fullname',
  })
  fullName: string;

  @ApiProperty({
    description: 'Client email',
  })
  email: string;
  @ApiProperty({
    description: 'Client plain password',
  })
  password: string;

  @ApiProperty({ nullable: true, description: 'Client phone number' })
  phone?: string;

  @ApiProperty({ nullable: true, description: 'Client profile avatar' })
  avatarFile: Express.Multer.File | null;
}

export const clientSignupSchema = object({
  fullName: string().required().min(4),
  email: string().email().required(),
  password: string().required().min(8),
  phone: string(),
});
