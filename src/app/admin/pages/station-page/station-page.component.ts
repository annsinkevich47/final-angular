import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';

import StationType, { ConnectedType } from '../../models/stations';
import { GetStationsService } from '../../services/get-stations.service';

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
    public getStations: GetStationsService,
    private formBuilder: FormBuilder
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

    this.stationsObserve$ = this.getStations.getStations().pipe(
      map(data => {
        this.stationList = data.items;
        return data.items;
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

  public getAllStations(): void {
    if (this.formStations.valid) {
      const formData = this.formStations.value;
      console.log('Form Data:', formData);
    }
  }

  public onSave(): void {
    if (this.formStations.valid) {
      const formValue = this.formStations.value;

      const connectedStations: ConnectedType[] = this.selectedStations.controls
        .map(control => {
          const stationId = +control.value;
          const station = this.stationList.find(
            stationItem => stationItem.id === stationId
          );
          return station ? { id: station.id, distance: 0 } : null;
        })
        .filter((station): station is ConnectedType => station !== null);

      const newStation: StationType = {
        id: this.stationList.length + 1,
        city: formValue.name,
        latitude: Number(formValue.latitude),
        longitude: Number(formValue.longitude),
        connectedTo: connectedStations,
      };

      this.stationList = [...this.stationList, newStation];

      this.formStations.reset();
      this.selectedStations.clear();

      console.log('New Station Added:', newStation);
      console.log('Updated Station List:', this.stationList);
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
