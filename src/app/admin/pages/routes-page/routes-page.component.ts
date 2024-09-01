import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouteType } from '../../../shared/models/routes-response.model';
import { Station } from '../../../shared/models/stations-response.model';
import { loadRoutes } from '../../redux/actions/routes.actions';
import { loadStations } from '../../redux/actions/stations.actions';
import { selectAllRoutes } from '../../redux/selectors/routes.selector';
import { selectAllStations } from '../../redux/selectors/stations.selector';

@Component({
  selector: 'app-routes-page',
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
})
export class RoutesPageComponent implements OnInit {
  routes: RouteType[];
  isEditable: boolean = false;
  stations$!: Observable<Station[]>;
  routes$!: Observable<RouteType[]>;
  stations: Station[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.stations$ = this.store.select(selectAllStations);
    this.store.dispatch(loadStations());
    this.stations$.subscribe(stations => {
      this.stations = stations;
    });
    this.routes$ = this.store.select(selectAllRoutes);
    this.store.dispatch(loadRoutes());
    this.routes$.subscribe(routes => {
      this.routes = routes;
    });
  }

  createCard() {
    this.isEditable = true;
  }
}
