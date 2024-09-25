import { User as CustomUser } from '@src/entities/user/dtos/user.dto';

declare global {
  namespace Express {
    interface Request {
      user: CustomUser;
    }
  }
}
