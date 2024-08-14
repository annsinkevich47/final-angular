import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [HomePageComponent, TripPageComponent],
  imports: [CommonModule, SharedModule, SearchRoutingModule],
})
export class SearchModule {}
