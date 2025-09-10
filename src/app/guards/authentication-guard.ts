import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router);

  console.log('Authentication Guard - isAuthenticated:', authService.isAuthenticated);
  console.log('Authentication Guard - User Roles:', authService.roles);

  let token: string | null = null;
  let roles: Array<string> = [];
  let isAuthenticated: Boolean = false;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token');
    const rolesString = localStorage.getItem('roles');
    roles = rolesString ? JSON.parse(rolesString) : [];
    isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  console.log("Intercepteur token: ", token);
  console.log("Intercepteur roles: ", roles);
  console.log("Intercepteur isAuthenticated: ", isAuthenticated);

  // Check if the user is authenticated
  if (isAuthenticated==true) {//authService.isAuthenticated==true
    return true;   
  } else{
    // If not authenticated, redirect to login page
    console.log('User is not authenticated, redirecting to login');
    router.navigateByUrl('/login');
    return false; // Prevent navigation to the requested route
  }
};
