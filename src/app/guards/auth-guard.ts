import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth as AuthService } from '../services/auth';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (await authService.checkLoggedIn()) {
    return true;
  }
  return router.navigate(['/login']);
};
