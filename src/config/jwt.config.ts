import { registerAs } from '@nestjs/config';
import { Role } from '@src/auth/guards/roles.guard';
import { object, string } from 'yup';

export interface JwtConfig {
  jwtAccessKey: string;
  jwtRefreshKey: string;
  jwtIssuer: string;
  jwtAccessTtl: string;
  jwtRefreshTtl: string;
}

export interface JwtPayload {
  email: string;
  fullName: string;
  avatarUrl: string;
  sub: string;
  role: Role
}

const jwtSchema = object({
  JWT_ACCESS_KEY: string().required(),
  JWT_REFRESH_KEY: string().required(),
  JWT_ACCESS_TTL: string(),
  JWT_REFRESH_TTL: string(),
  JWT_ISSUER: string(),
});

export const jwtConfig = registerAs('jwt', async (): Promise<JwtConfig> => {
  const env = await jwtSchema.validate(process.env);
  return {
    jwtAccessKey: env.JWT_ACCESS_KEY,
    jwtRefreshKey: env.JWT_REFRESH_KEY,
    jwtAccessTtl: env.JWT_ACCESS_TTL,
    jwtRefreshTtl: env.JWT_REFRESH_TTL,
    jwtIssuer: env.JWT_ISSUER,
  };
});
