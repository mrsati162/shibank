import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AddressComponent } from './pages/address/address.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent,
      children: [
            {
              path: 'address', component: AddressComponent , data: { showParent: false }
            }
          ]},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
  ];
