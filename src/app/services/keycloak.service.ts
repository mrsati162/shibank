import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import type { KeycloakInstance } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: KeycloakInstance | undefined;

  async init(): Promise<boolean> {
      this.keycloak = new Keycloak({
        url: 'http://127.0.0.1:8080',
        realm: 'myrealm',
        clientId: 'myclient',
      });

      try {
        const authenticated = await this.keycloak.init({
          onLoad: 'check-sso',
          checkLoginIframe: true,
        });
        return authenticated;
      } catch (err) {
        console.error('Keycloak initialization failed', err);
        throw err;
      }
    }


  login(redirectUri?: string): void {
      this.keycloak?.login({
        redirectUri: redirectUri || window.location.origin,
      });
    }
  isLoggedIn(): boolean {
      return !!this.keycloak?.token;
    }

  logout(redirectUri?: string): void {
    this.keycloak?.logout({
          redirectUri: redirectUri || window.location.origin
    });
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }
  async updateTokenIfNeeded(minValidity: number = 60): Promise<string | undefined> {
      if (!this.keycloak) return undefined;
       if (!this.keycloak.authenticated) {
        console.warn('[Keycloak] Not authenticated. Skipping token refresh.');
        return undefined;
      }
      try {
        const refreshed = await this.keycloak.updateToken(minValidity);
        if (refreshed) console.log('Token refreshed before HTTP request');
        return this.keycloak.token;
      } catch (err) {
        console.error('Failed to refresh token', err);
        this.logout();
        return undefined;
      }
    }
}
