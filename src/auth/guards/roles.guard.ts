import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminModel } from '@src/entities/admin/admin.model';
import { UserModel } from '@src/entities/user/user.model';

export type Role = 'user' | 'admin';

export class RolesGuard implements CanActivate {
  constructor(private readonly roles: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserModel | AdminModel | null;
    return false;
  }
}
