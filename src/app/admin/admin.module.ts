import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
<<<<<<< HEAD
=======
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { AdminComponent } from './pages/admin.component';
>>>>>>> 129fc0958c53627d0fa9899b4bea34f833592afe
import { CarriagesPageComponent } from './pages/carriages-page/carriages-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { StationPageComponent } from './pages/station-page/station-page.component';

@NgModule({
  declarations: [
    StationPageComponent,
    CarriagesPageComponent,
    RoutesPageComponent,
<<<<<<< HEAD
=======
    AdminNavigationComponent,
    AdminComponent,
>>>>>>> 129fc0958c53627d0fa9899b4bea34f833592afe
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
