import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminModel } from '@src/entities/user/admin/admin.model';
import { User } from '@src/entities/user/dtos/user.dto';
import { Request } from 'express';

export type Role = 'client' | 'admin';

export class RolesGuard implements CanActivate {
  constructor(private readonly roles: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as User | null;

    if (!user) return false;

    const role = user instanceof AdminModel ? 'admin' : 'client';

    if (!this.roles.includes(role)) {
      return false;
    }
    return true;
  }
}
