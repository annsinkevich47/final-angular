import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouteType } from '../../../shared/models/routes-response.model';
import { Station } from '../../../shared/models/stations-response.model';
import CarriageType from '../../models/carriage';
import { loadCarriages } from '../../redux/actions/carriages.actions';
import { updateRoute } from '../../redux/actions/routes.actions';
import { setFormType } from '../../redux/actions/routes-form.actions';
import { selectAllCarriages } from '../../redux/selectors/carriages.selector';
import { selectRouteFromState } from '../../redux/selectors/routes-form.selector';
import { selectAllStations } from '../../redux/selectors/stations.selector';
import { RouteFormComponent } from '../route-form/route-form.component';

@Component({
  selector: 'app-route-edit-form',
  templateUrl: './route-edit-form.component.html',
  styleUrl: './route-edit-form.component.scss',
})
export class RouteEditFormComponent
  extends RouteFormComponent
  implements OnInit
{
  private stations$: Observable<Station[]>;
  private carriages$!: Observable<CarriageType[]>;
  public formState: RouteType | null;
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

  public addStation(value: number | '' = ''): void {
    const stationControl = this.fb.control(value);
    this.stations.push(stationControl);
  }

  public addCarriages(value: string = ''): void {
    const stationControl = this.fb.control(value);
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
    const formStateStore = this.store.select(selectRouteFromState);
    formStateStore.subscribe(data => {
      this.formState = data;
      this.setupForm();
    });
  }

  public setupForm() {
    this.stationForm.reset();
    this.stations.clear();
    this.carriages.clear();
    this.formState?.carriages.forEach(code => {
      this.addCarriages(code);
    });
    this.formState?.path.forEach(id => {
      this.addStation(id);
    });
    this.addCarriages();
    this.addStation();
  }

  public onSubmit() {
    if (this.stationForm.valid) {
      this.stations.value.pop();
      this.carriages.value.pop();
      this.store.dispatch(
        updateRoute({
          path: this.stations.value,
          carriages: this.carriages.value,
          id: this.formState?.id,
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
