import { InjectionToken } from '@angular/core';

export interface AppConfig {
  production: boolean;
  apiUrl: string;
}

// Token injectable pour accéder à la config
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    production: false,
    apiUrl: 'http://localhost:8085'  // URL API par défaut (dev)
  })
});
