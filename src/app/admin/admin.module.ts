import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { StationPageComponent } from './pages/station-page/station-page.component';
import { CarriagesPageComponent } from './pages/carriages-page/carriages-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { GetCarriagesService } from './services/get-carriages.service';
import { CarriageItemComponent } from './components/carriage-item/carriage-item.component';

@NgModule({
  declarations: [
    StationPageComponent,
    CarriagesPageComponent,
    RoutesPageComponent,
    AdminNavigationComponent,
    CarriageItemComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
