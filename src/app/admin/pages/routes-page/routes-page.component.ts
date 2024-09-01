import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouteType } from '../../../shared/models/routes-response.model';
import { Station } from '../../../shared/models/stations-response.model';
import CarriageType from '../../models/carriage';
import { loadCarriages } from '../../redux/actions/carriages.actions';
import { loadRoutes } from '../../redux/actions/routes.actions';
import { setFormType } from '../../redux/actions/routes-form.actions';
import { loadStations } from '../../redux/actions/stations.actions';
import { selectAllCarriages } from '../../redux/selectors/carriages.selector';
import { selectAllRoutes } from '../../redux/selectors/routes.selector';
import { selectRouteFormType } from '../../redux/selectors/routes-form.selector';
import { selectAllStations } from '../../redux/selectors/stations.selector';

@Component({
  selector: 'app-routes-page',
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
})
export class RoutesPageComponent implements OnInit {
  routes: RouteType[];
  formType: 'create' | 'update' | null;
  stations$!: Observable<Station[]>;
  routes$!: Observable<RouteType[]>;
  stations: Station[];
  carriages: CarriageType[];

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
    const carriagesStore = this.store.select(selectAllCarriages);
    this.store.dispatch(loadCarriages());
    carriagesStore.subscribe(carriages => {
      this.carriages = carriages;
    });
    const formTypeStore = this.store.select(selectRouteFormType);
    formTypeStore.subscribe(data => {
      this.formType = data;
    });
  }

  public createCard() {
    this.store.dispatch(setFormType({ formType: 'create' }));
  }
}
