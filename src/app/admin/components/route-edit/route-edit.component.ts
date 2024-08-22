import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  ConnectedStations,
  Station,
} from '../../../shared/models/stations-response.model';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrl: './route-edit.component.scss',
})
export class RouteEditComponent implements OnInit {
  stationForm: FormGroup;
  availableStations: Station[] = [];
  selectedStationsList: Station[] = [];

  constructor(
    private fb: FormBuilder,
    private stationService: StationService
  ) {
    this.stationForm = this.fb.group({
      stations: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.stationService.getStations().subscribe((data: any) => {
      this.availableStations = [...data];
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
