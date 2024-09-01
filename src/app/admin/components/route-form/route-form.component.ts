import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import {
  ConnectedStations,
  Station,
} from '../../../shared/models/stations-response.model';
import CarriageType from '../../models/carriage';

@Component({
  selector: 'app-route-form',
  template: '',
})
export abstract class RouteFormComponent {
  public stationForm: FormGroup;
  public availableCarriages: CarriageType[] = [];
  public availableStations: Station[] = [];
  public allStations: Station[] = [];
  public selectedStationsList: Station[] = [];

  public abstract onSubmit(): void;

  protected resetForm() {
    this.stationForm.reset();
    this.stations.clear();
    this.carriages.clear();
    this.addStation();
    this.addCarriages();
  }

  get stations(): FormArray {
    return this.stationForm.get('stations') as FormArray;
  }
  get carriages(): FormArray {
    return this.stationForm.get('carriages') as FormArray;
  }

  protected abstract addStation(): void;

  protected abstract addCarriages(): void;

  protected onStationChange(index: number, id: number): void {
    if (index === this.stations.length - 1) {
      this.addStation();
      const selectedStation = this.availableStations.filter(
        station => station.id === id,
      );
      this.selectedStationsList = [
        ...this.selectedStationsList,
        ...selectedStation,
      ];
      const connectedStations = selectedStation[0].connectedTo;
      this.availableStations = [
        ...this.getStationsFromId(connectedStations, this.allStations),
        ...this.selectedStationsList,
      ].filter(
        // filter duplicates
        (item, i, self) =>
          i === self.findIndex(station => station.id === item.id),
      );
    }
  }

  protected onCarriageChange(index: number) {
    if (index === this.carriages.length - 1) {
      this.addCarriages();
    }
  }

  protected getStationsFromId(
    connectedTo: ConnectedStations[],
    stations: Station[],
  ) {
    return connectedTo
      .map(connection => {
        const station = stations.find(item => item.id === connection.id);
        if (station) {
          return station;
        }
        return null;
      })
      .filter(station => station !== null) as Station[];
  }
}
