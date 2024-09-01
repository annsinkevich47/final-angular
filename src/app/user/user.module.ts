import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PopupBookComponent } from '../search-trip/components/popup-book/popup-book.component';
import { PopupStationsComponent } from '../search-trip/components/popup-stations/popup-stations.component';
import { FilterComponent } from '../search-trip/components/search/filter/filter.component';
import { ResultComponent } from '../search-trip/components/search/result/result.component';
import { SearchComponent } from '../search-trip/components/search/search/search.component';
import { BasicInfoComponent } from '../search-trip/components/trip/basic-info/basic-info.component';
import { CarComponent } from '../search-trip/components/trip/car/car.component';
import { ResultTripComponent } from '../search-trip/components/trip/result-trip/result-trip.component';
import { SharedModule } from '../shared/shared.module';
import { CancelOrderModalComponent } from './components/cancel-order-modal/cancel-order-modal.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotAuthorizedPageComponent } from './pages/not-authorized-page/not-authorized-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { UserComponent } from './pages/user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    FilterComponent,
    SearchComponent,
    ResultComponent,
    PopupStationsComponent,
    PopupBookComponent,
    ResultTripComponent,
    BasicInfoComponent,
    CarComponent,
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
    NotAuthorizedPageComponent,
    OrderItemComponent,
    OrderListComponent,
    CancelOrderModalComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
