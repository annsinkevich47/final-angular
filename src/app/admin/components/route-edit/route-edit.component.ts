import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Station } from '../../../shared/models/stations-response.model';
import { getStationsFromId } from '../../../shared/utils/getStationsFromId';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrl: './route-edit.component.scss',
})
export class RouteEditComponent implements OnInit {
  stationForm: FormGroup;
  availableStations: Station[] = [];
  selectedStations: Station[] = [];

  constructor(
    private fb: FormBuilder,
    private stationService: StationService
  ) {
    this.stationForm = this.fb.group({
      stations: this.fb.array([]),
    });
  }

  logToConsole(value: any) {
    console.log(value);
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
      const filteredStation = this.availableStations.filter(
        station => station.id === id
      );
      this.selectedStations = [...this.selectedStations, ...filteredStation];
      const connectedStations = filteredStation[0].connectedTo;
      this.availableStations = [
        ...getStationsFromId(connectedStations, this.availableStations),
        ...this.selectedStations,
      ];
    }
  }
}
