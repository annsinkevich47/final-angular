import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { Station } from '../../../shared/models/stations-response.model';
import StationType, {
  ConnectedType,
  StationResponse,
  StationServer,
} from '../../models/stations';
import * as StationActions from '../../redux/actions/stations.actions';
import { selectAllStations } from '../../redux/selectors/stations.selector';
import { AddStationService } from '../../services/add-station.service';

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrl: './station-page.component.scss',
})
export class StationPageComponent implements OnInit {
  public stationsObserve$!: Observable<StationType[]>;
  public stationList: StationType[] | [] = [];
  public formStations!: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private addStationService: AddStationService
  ) {}

  ngOnInit(): void {
    this.formStations = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      latitude: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(90),
          Validators.min(-90),
        ],
      ],
      longitude: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(180),
          Validators.min(-180),
        ],
      ],
      selectedStations: this.formBuilder.array([]),
    });
    this.store.dispatch(StationActions.loadStations());

    this.stationsObserve$ = this.store.select(selectAllStations).pipe(
      tap(stations => {
        this.stationList = stations;
        console.log(this.stationList)
        if (stations.length > 0 && this.selectedStations.length === 0) {
          this.addStationSelect();
        }
      })
    );

    this.addStationSelect();
  }

  get selectedStations(): FormArray {
    return this.formStations.get('selectedStations') as FormArray;
  }

  private createStationControl(defaultValue: string = ''): FormControl {
    return new FormControl(defaultValue);
  }

  public addStationSelect(): void {
    console.log(this.stationList);
    const firstAvailableStationId =
      this.stationList.length > 0 ? String(this.stationList[0].city) : '';
    this.selectedStations.push(
      this.createStationControl(firstAvailableStationId)
    );
  }

  public onStationSelect(index: number, event: Event): void {
    const selectedStationId = +(event.target as HTMLSelectElement).value;
    const selectedStationCity = this.getCityNameById(selectedStationId);

    this.selectedStations.at(index).setValue(selectedStationCity);

    if (selectedStationCity && index === this.selectedStations.length - 1) {
      this.addStationSelect();
    }
    console.log(this.selectedStations.controls);

    console.log(this.selectedStations.value);
  }

  public availableStations(index: number): StationType[] {
    const selectedStationCities = this.selectedStations.controls
      .slice(0, index + 1)
      .map(control => control.value);
    return this.stationList.filter(
      station => !selectedStationCities.includes(station.city)
    );
  }

  public getCityNameById(id: number): string {
    const station = this.stationList.find(stationItem => stationItem.id === id);
    return station ? station.city : 'Unknown';
  }

  public onSave(): void {
    if (this.formStations.valid) {
      const formValue = this.formStations.value;

      const selectedCityNames: string[] = this.selectedStations.controls.map(
        control => control.value
      );
      const connectedStationsById: ConnectedType[] = selectedCityNames
        .map(cityName => {
          const station = this.stationList.find(
            stationItem => stationItem.city === cityName
          );
          return station ? { id: station.id, distance: 0 } : null;
        })
        .filter((station): station is ConnectedType => station !== null);

      console.log('Selected City Names:', selectedCityNames);
      console.log('Connected Stations (IDs):', connectedStationsById);

      const stationToServer: StationServer = {
        city: formValue.name,
        latitude: Number(formValue.latitude),
        longitude: Number(formValue.longitude),
        relations: connectedStationsById.map(station => station.id),
      };
      console.log(stationToServer);

      this.addStationService.addStation(stationToServer).subscribe({
        next: response => {
          const responseWithId = response as StationResponse;
          console.log('Station successfully added to server:', response);
          const newStation: Station = {
            id: responseWithId.id,
            city: response.city,
            latitude: response.latitude,
            longitude: response.longitude,
            connectedTo: connectedStationsById,
          };
          this.store.dispatch(
            StationActions.addStation({ station: newStation })
          );
          this.stationList = [newStation, ...this.stationList];
          this.formStations.reset();
          this.selectedStations.clear();
        },
        error: error => {
          console.error('Error adding station to server:', error);
        }
      });

      this.formStations.reset();
      this.selectedStations.clear();
    }
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.formStations.get(formControlName);
    if (control && control.touched && control.invalid) {
      switch (true) {
        case control.hasError('required'):
          return 'Field is required';
        case control.hasError('pattern'):
          return 'Please enter a valid value';
        case control.hasError('max'):
          return 'Number is too big';
        case control.hasError('min'):
          return 'Number is too small';
        default:
          return '';
      }
    }
    return '';
  }
}
