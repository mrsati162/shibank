import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  return from(keycloakService.updateTokenIfNeeded()).pipe(
    mergeMap(token => {
      if (!token) return next(req);
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`
      };
      if (!req.headers.has('Content-Type')) {
        headers['Content-Type'] = 'application/json';
      }
      const cloned = req.clone({ setHeaders: headers });
      return next(cloned);
    }),
    catchError(err => {
      console.error('[AuthInterceptorFn] Error:', err);
      return next(req);
    })
  );
};
