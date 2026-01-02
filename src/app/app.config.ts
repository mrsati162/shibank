import { APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors  } from '@angular/common/http';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { authInterceptorFn } from 'src/app/interceptors/auth.interceptor';

import { routes } from './app.routes';

export function initializeKeycloak(keycloak: KeycloakService) {
  return async () => keycloak.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
         provide: APP_INITIALIZER,
         useFactory: initializeKeycloak,
         multi: true,
         deps: [KeycloakService],
       },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptorFn]))
    ]
};
