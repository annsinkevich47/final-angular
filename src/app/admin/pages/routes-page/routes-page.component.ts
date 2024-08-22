import { Component, OnInit } from '@angular/core';
import { RouteType } from '../../../shared/models/routes-response.model';
import { RoutesService } from '../../services/route.service';
import { Station } from '../../../shared/models/stations-response.model';
import { Observable } from 'rxjs';
import { selectAllStations } from '../../redux/selectors/stations.selector';
import { loadStations } from '../../redux/actions/stations.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-routes-page',
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
})
export class RoutesPageComponent implements OnInit {
  routes: RouteType[];
  isEditable: boolean = false;
  stations$!: Observable<Station[]>;
  stations: Station[];

  constructor(
    private routesService: RoutesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe(data => {
      this.routes = data;
    });
    this.stations$ = this.store.select(selectAllStations);
    this.store.dispatch(loadStations());
    this.stations$.subscribe(stations => {
      this.stations = stations;
    });
  }

  createCard() {
    this.isEditable = true;
  }
}
