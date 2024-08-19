import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { RouteCardComponent } from './components/route-card/route-card.component';
import { RouteEditComponent } from './components/route-edit/route-edit.component';
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
    CarriageItemComponent,
    AdminComponent,
    RouteCardComponent,
    RouteEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
