import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { UserComponent } from './pages/user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    HomePageComponent,
    RegistrationFormComponent,
    RegistrationPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    OrdersPageComponent,
    UserProfileComponent,
    ProfileModalComponent,
    ProfilePageComponent,
    UserComponent,
    TripPageComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
