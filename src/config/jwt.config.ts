import { registerAs } from '@nestjs/config';
import { object, string } from 'yup';

export interface JwtConfig {
  privateKey: string;
  issuer: string;
  ttl: string | number;
  hashSalt: string | number;
}

const jwtSchema = object({
  JWT_PRIVATE_KEY: string().required(),
  JWT_TTL: string(),
  JWT_ISSUER: string(),
  HASH_SALT: string(),
});

export const jwtConfig = registerAs('jwt', async () => {
  const env = await jwtSchema.validate(process.env);
  return {
    privateKey: env.JWT_PRIVATE_KEY,
    ttl: env.JWT_TTL,
    issuer: env.JWT_ISSUER,
    hashSalt: env.HASH_SALT,
  };
});
