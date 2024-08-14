import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    component: StationPageComponent,
  },
  {
    path: 'carriages',
    component: CarriagesPageComponent,
  },
  {
    path: 'routes',
    component: RoutesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
