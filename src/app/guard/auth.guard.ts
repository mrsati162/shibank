import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  canActivate(): boolean {
    if (this.keycloak.isLoggedIn()) {
      return true;
    } else {
      this.keycloak.login(`${window.location.origin}/home`)
      return false;
    }
  }
}
