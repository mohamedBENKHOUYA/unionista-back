import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'yup';

export class SigninDto {
  @ApiProperty({
    description: 'user email',
  })
  email: string;
  @ApiProperty({
    description: 'user password',
  })
  password: string;
  @ApiProperty({
    description: 'specifies if user wants to stay connected',
  })
  stayConnected: boolean;
}

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  stayConnected: Joi.boolean().required(),
});
