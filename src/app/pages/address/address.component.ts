import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Onboarding } from 'src/app/model/onboarding.model';
import { UserData } from 'src/app/model/userdata.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-address',
  imports: [FormsModule, CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  receivedData: any;
  error = '';
  onboarding:Onboarding;
  onboardingUrl = environment.onboardingUrl;
  constructor(private router: Router, private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute) {
      this.onboarding = new Onboarding();
      const navigation = this.router.getCurrentNavigation();
      this.receivedData = navigation?.extras.state;
      console.log(this.receivedData);
      if(this.receivedData) {
        this.onboarding.kycNumber = this.receivedData['kycNumber'];
        this.onboarding.applicationId= this.receivedData['applicationId'];
        this.onboarding.product= this.receivedData['product'];
      } else {
        this.router.navigate(['/register']);
      }
    this.getAddressDetails();
      console.log('Data from parent:', this.receivedData);
    }

  getAddressDetails () {
//    const postBody = { kycNumber: this.kycNumber, applicationId: this.onboarding.applicationId };
   const postBody = JSON.stringify(this.onboarding);
   const headers = new HttpHeaders({
           'Content-Type': 'application/json'
         });
       this.apiService.post<Onboarding>(`${this.onboardingUrl}`,'fetchDetails', postBody, headers)
         .subscribe(
          (data: Onboarding) => {
                        this.onboarding = data;
                        console.log(this.onboarding);
                      },
                      (error) => {
                        console.error('Error fetching user:', error);
                      }
         );
   }
   isChildActive(): boolean {
        return this.route.firstChild != null;
    }
  validateAddress() {
    console.log(this.onboarding);
    const postBody = JSON.stringify(this.onboarding);
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    this.apiService.post<Onboarding>(`${this.onboardingUrl}`,'createAccount', postBody, headers)
             .subscribe(
              (data: Onboarding) => {
                            this.onboarding = data;
                            console.log(this.onboarding);
                            this.router.navigate(['/']);
                          },
                          (error) => {
                            console.error('Error fetching user:', error);
                          }
             );
    }
}
