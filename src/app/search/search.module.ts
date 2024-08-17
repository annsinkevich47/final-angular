import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [
    HomePageComponent,
    TripPageComponent,
    SearchComponent,
    FilterComponent,
    ResultComponent,
  ],
  imports: [CommonModule, SharedModule, SearchRoutingModule],
})
export class SearchModule {}
