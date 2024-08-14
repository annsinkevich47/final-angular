import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { StationPageComponent } from './pages/station-page/station-page.component';
import { CarriagesPageComponent } from './pages/carriages-page/carriages-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';

@NgModule({
  declarations: [
    StationPageComponent,
    CarriagesPageComponent,
    RoutesPageComponent
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
