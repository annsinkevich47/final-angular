import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { AdminComponent } from './pages/admin.component';
import { CarriagesPageComponent } from './pages/carriages-page/carriages-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { StationPageComponent } from './pages/station-page/station-page.component';

@NgModule({
  declarations: [
    StationPageComponent,
    CarriagesPageComponent,
    RoutesPageComponent,
    AdminNavigationComponent,
    AdminComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
