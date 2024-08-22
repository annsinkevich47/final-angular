import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ConnectedStations,
  Station,
} from '../../../shared/models/stations-response.model';
import CarriageType from '../../models/carriage';
import { loadCarriages } from '../../redux/actions/carriages.actions';
import { selectAllCarriages } from '../../redux/selectors/carriages.selector';
import { selectAllStations } from '../../redux/selectors/stations.selector';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrl: './route-edit.component.scss',
})
export class RouteEditComponent implements OnInit {
  private stations$: Observable<Station[]>;
  private carriages$!: Observable<CarriageType[]>;
  public stationForm: FormGroup;
  public availableCarriages: CarriageType[] = [];
  public availableStations: Station[] = [];
  public selectedStationsList: Station[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.stationForm = this.fb.group({
      stations: this.fb.array([]),
      carriages: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.stations$ = this.store.select(selectAllStations);
    this.stations$.subscribe(stations => {
      this.availableStations = stations;
    });
    this.carriages$ = this.store.select(selectAllCarriages);
    this.store.dispatch(loadCarriages());
    this.carriages$.subscribe(carriages => {
      this.availableCarriages = carriages;
    });
    this.addStation();
    this.addCarriages();
  }

  get stations(): FormArray {
    return this.stationForm.get('stations') as FormArray;
  }
  get carriages(): FormArray {
    return this.stationForm.get('carriages') as FormArray;
  }

  addStation(): void {
    const stationControl = this.fb.control('');
    this.stations.push(stationControl);
  }

  addCarriages(): void {
    const stationControl = this.fb.control('');
    this.carriages.push(stationControl);
  }

  onStationChange(index: number, id: number): void {
    if (index === this.stations.length - 1) {
      this.addStation();
      const selectedStation = this.availableStations.filter(
        station => station.id === id
      );
      this.selectedStationsList = [
        ...this.selectedStationsList,
        ...selectedStation,
      ];
      const connectedStations = selectedStation[0].connectedTo;
      this.availableStations = [
        ...this.getStationsFromId(connectedStations, this.availableStations),
        ...this.selectedStationsList,
      ].filter(
        // filter duplicates
        (item, index, self) =>
          index === self.findIndex(station => station.id === item.id)
      );
    }
  }

  onCarriageChange(index: number) {
    if (index === this.carriages.length - 1) {
      this.addCarriages();
    }
  }

  getStationsFromId(connectedTo: ConnectedStations[], stations: Station[]) {
    return connectedTo
      .map(connection => {
        const station = stations.find(station => station.id === connection.id);
        if (station) {
          return station;
        }
        return null;
      })
      .filter(station => station !== null) as Station[];
  }
}
