import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Station } from '../../../shared/models/stations-response.model';
import CarriageType from '../../models/carriage';
import { loadCarriages } from '../../redux/actions/carriages.actions';
import { createRoute } from '../../redux/actions/routes.actions';
import { setFormType } from '../../redux/actions/routes-form.actions';
import { selectAllCarriages } from '../../redux/selectors/carriages.selector';
import { selectAllStations } from '../../redux/selectors/stations.selector';
import { RouteFormComponent } from '../route-form/route-form.component';

@Component({
  selector: 'app-route-create-form',
  templateUrl: './route-create-form.component.html',
  styleUrl: './route-create-form.component.scss',
})
export class RouteCreateFormComponent
  extends RouteFormComponent
  implements OnInit
{
  private stations$: Observable<Station[]>;
  private carriages$!: Observable<CarriageType[]>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    super();
    this.stationForm = this.fb.group({
      stations: this.fb.array([], [Validators.minLength(2)]),
      carriages: this.fb.array([], [Validators.minLength(2)]),
    });
  }

  public addStation(): void {
    const stationControl = this.fb.control('');
    this.stations.push(stationControl);
  }

  public addCarriages(): void {
    const stationControl = this.fb.control('');
    this.carriages.push(stationControl);
  }

  ngOnInit(): void {
    this.stations$ = this.store.select(selectAllStations);
    this.stations$.subscribe(stations => {
      this.availableStations = stations;
      this.allStations = stations;
    });
    this.carriages$ = this.store.select(selectAllCarriages);
    this.store.dispatch(loadCarriages());
    this.carriages$.subscribe(carriages => {
      this.availableCarriages = carriages;
    });
    this.addStation();
    this.addCarriages();
  }

  public onSubmit() {
    if (this.stationForm.valid) {
      this.stations.value.pop();
      this.carriages.value.pop();
      this.store.dispatch(
        createRoute({
          path: this.stations.value,
          carriages: this.carriages.value,
        }),
      );
      this.resetForm();
      this.store.dispatch(setFormType({ formType: null }));
    } else {
      this.carriages.markAsTouched();
      this.stations.markAsTouched();
    }
  }
}
