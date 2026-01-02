import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Onboarding } from 'src/app/model/onboarding.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  kycNumber = '';
  error = '';
  products: string[] = [];
  product = '';
  isParentVisible = true;
  onboarding: Onboarding | undefined;
  onboardingUrl = environment.onboardingUrl;
   constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService) {
     this.onboarding = new Onboarding();
     this.kycNumber = '';
     this.getProducts();
     }

   ngOnInit() {
     this.onboarding = new Onboarding();
     this.kycNumber = '';
     this.route.children[0]?.data.subscribe(data => {
       this.isParentVisible = data['showParent'] !== false;
     });
   }

   isChildActive(): boolean {
       return this.route.firstChild != null;
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

  validateKYC() {
    if(this.kycNumber != '' && this.kycNumber.length > 6)  {
      const postBody = { kycNumber: this.kycNumber};
             this.apiService.post<Onboarding>(`${this.onboardingUrl}`,'validateKyc', postBody)
               .subscribe(
                (data: Onboarding) => {
                    this.onboarding = data;
                    console.log(this.onboarding);
                    this.router.navigate(['address'], {
                            relativeTo: this.route,
                            state: { kycNumber: this.kycNumber, applicationId: this.onboarding.applicationId, product: this.product }
                            }
                          );
                  },
                  (error) => {
                    console.error('Error fetching user:', error);
                  }
               );
    }
  }
}
