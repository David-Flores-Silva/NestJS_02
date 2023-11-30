import { Role } from '../enums/rol.enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(role: Role) {
  return applyDecorators(Roles(Role.ADMIN), UseGuards(AuthGuard, RolesGuard));
}
