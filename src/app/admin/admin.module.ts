import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CarriageItemComponent } from './components/carriage-item/carriage-item.component';
import { AdminComponent } from './pages/admin.component';
import { CarriagesPageComponent } from './pages/carriages-page/carriages-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { StationPageComponent } from './pages/station-page/station-page.component';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';

@NgModule({
  declarations: [
    StationPageComponent,
    CarriagesPageComponent,
    RoutesPageComponent,
    AdminNavigationComponent,
    CarriageItemComponent,
    AdminComponent,
    AdminNavigationComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
