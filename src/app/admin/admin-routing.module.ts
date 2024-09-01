import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { CarriagesPageComponent } from './pages/carriages-page/carriages-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { StationPageComponent } from './pages/station-page/station-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stations',
    pathMatch: 'full',
  },
  {
    path: 'stations',
    canActivate: [AuthGuard],
    component: StationPageComponent,
  },
  {
    path: 'carriages',
    canActivate: [AuthGuard],
    component: CarriagesPageComponent,
  },
  {
    path: 'routes',
    canActivate: [AuthGuard],
    component: RoutesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
