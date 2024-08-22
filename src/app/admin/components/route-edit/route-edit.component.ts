import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ConnectedStations,
  Station,
} from '../../../shared/models/stations-response.model';
import { loadStations } from '../../redux/actions/stations.actions';
import { selectAllStations } from '../../redux/selectors/stations.selector';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrl: './route-edit.component.scss',
})
export class RouteEditComponent implements OnInit {
  private stations$: Observable<Station[]>;
  stationForm: FormGroup;
  availableStations: Station[] = [];
  selectedStationsList: Station[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.stationForm = this.fb.group({
      stations: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.stations$ = this.store.select(selectAllStations);
    this.stations$.subscribe(stations => {
      this.availableStations = stations;
    });
    this.addStation();
  }

  get stations(): FormArray {
    return this.stationForm.get('stations') as FormArray;
  }

  addStation(): void {
    const stationControl = this.fb.control('');
    this.stations.push(stationControl);
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
