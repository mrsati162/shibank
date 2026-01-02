import { Component } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { environment } from '../../../environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  onboardingUrl = environment.onboardingUrl;
  products: string[] = [];
  product = '';
  constructor(private keycloak: KeycloakService, private apiService: ApiService) {
    this.getProducts();
    }

  logout() {
    this.keycloak.logout();
  }

getProducts() {
   this.apiService.get<string[]>(`${this.onboardingUrl}`,'products')
        .subscribe(
         (data: string[]) => {
             this.products = data;
             console.log(this.products);
             this.product = this.products.length > 0 ? this.products[0] : '';
           },
           (error) => {
             console.error('Error fetching Products:', error);
           }
        );
   }
}
