import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { appHttpInterceptor } from './interceptors/app-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([appHttpInterceptor]),// Pour injecter l'intercepteur http
    ),//Pour utiliser la partie BACKEND de l'application, il faut ajouter le provide (module) provideHttpClient(HttpClientModule) dans app.config.ts ( v13 dans app.module.ts)
    
  ]
};
