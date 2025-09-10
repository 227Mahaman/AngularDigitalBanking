import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  //const expectedRoles = route.data['roles'] as Array<string>;
  //console.log("Authorization Guard - Expected Roles: ", expectedRoles);
  console.log("Authorization Guard - User Roles: ", authService.roles);
  let token: string | null = null;
  let roles: Array<string> = [];

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token');
    const rolesString = localStorage.getItem('roles');
    roles = rolesString ? JSON.parse(rolesString) : [];

  }

  console.log("Intercepteur token: ", token);
  console.log("Intercepteur roles: ", roles);

  const router = inject(Router);
  let requiredRole = route.data['role'];
  if (roles.includes(requiredRole)) {//authService.
    return true;

  } else {
    router.navigateByUrl("admin/notAuthorized")
  }

  console.log("User is authorized");

  return true;
};
