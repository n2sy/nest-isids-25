import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/auth/generics/role.enum';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    let role = req.user.role;
    if (role == RoleEnum.ROLE_ADMIN) return true;
    else return false;
  }
}
