import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Station } from '../../../shared/models/stations-response.model';
import { loadRides } from '../../redux/actions/ride.actions';
import { loadStations } from '../../redux/actions/stations.actions';
import { RideState } from '../../redux/reducers/ride.reducer';
import { selectAllRides } from '../../redux/selectors/ride.selector';
import { selectAllStations } from '../../redux/selectors/stations.selector';

@Component({
  selector: 'app-ride-page',
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
})
export class RidePageComponent implements OnInit {
  public routeId: number;
  public stations$: Observable<Station[]>;
  public ride$: Observable<RideState>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.routeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(loadRides({ id: this.routeId }));
    this.ride$ = this.store.select(selectAllRides);
    this.store.dispatch(loadStations());
    this.stations$ = this.store.select(selectAllStations);
  }

  gotoRoutes() {
    this.router.navigateByUrl('/admin/routes');
  }
}
