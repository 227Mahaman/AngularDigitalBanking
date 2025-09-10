import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, Observable, throwError } from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  
  const auth = inject(Auth);// Injection de la dépendance Auth
  console.log("Auth: ", auth.accessToken, +auth.isAuthenticated);

  let token: string | null = null;
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token');
  }
  console.log("Intercepteur token: ", token);
  /**
   * Si l'utilisateur est authentifié, on ajoute le token dans l'entête Authorization
   * Sinon, on laisse la requête telle quelle
   */
  if(!req.url.includes("/auth/login") && token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq).pipe(
      catchError(err => {
        if (auth && err.status === 401) {// Si on reçoit une erreur 401 (non autorisé), on déconnecte l'utilisateur 
          auth.logout();
        }
        return throwError(err.message);
      })
    );
  }
  return next(req);
};
