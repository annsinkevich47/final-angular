import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Station } from '../../../shared/models/stations-response.model';
import {
  minSelectedStations,
  noDefaultSelectionsValidator,
} from '../../helpers/connect-validator';
import StationType, {
  StationResponse,
  StationServer,
} from '../../models/stations';
import * as StationActions from '../../redux/actions/stations.actions';
import { selectAllStations } from '../../redux/selectors/stations.selector';
import { AddStationService } from '../../services/add-station.service';
import { GetOrdersService } from '../../services/get-orders.service';

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrl: './station-page.component.scss',
})
export class StationPageComponent implements OnInit {
  public stationsObserve$!: Observable<StationType[]>;
  public stationList: StationType[] | [] = [];
  public formStations!: FormGroup;
  public errorStationId: number | null = null;
  public submitted: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private addStationService: AddStationService,
    private ordersService: GetOrdersService
  ) {}

  ngOnInit(): void {
    this.formStations = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      latitude: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[-+]?([1-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/),
        ],
      ],
      longitude: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[-+]?((1[0-7][0-9]|[1-9]?[0-9])(\.[0-9]+)?|180(\.0+)?)$/
          ),
        ],
      ],
      selectedStations: this.formBuilder.array([], {
        validators: [minSelectedStations(2), noDefaultSelectionsValidator()],
      }),
    });
    this.store.dispatch(StationActions.loadStations());
    this.stationsObserve$ = this.store.select(selectAllStations);
    this.stationsObserve$.subscribe(stations => {
      this.stationList = stations;
    });
    this.addConnectedStation();
  }

  get selectedStations(): FormArray {
    return this.formStations.get('selectedStations') as FormArray;
  }

  public addConnectedStation(): void {
    this.selectedStations.push(new FormControl('', Validators.required));
  }

  public onStationSelect(index: number): void {
    const selectedStationName = this.selectedStations.at(index).value;
    this.selectedStations.controls.forEach((control, i) => {
      if (i > index && control.value === selectedStationName) {
        control.setValue('');
      }
    });
  }

  public getAvailableStations(index: number): StationType[] {
    const selectedStationNames = this.selectedStations.controls
      .map(control => control.value)
      .filter(value => value);

    return this.stationList.filter(
      station =>
        !selectedStationNames.includes(station.city) ||
        this.selectedStations.at(index).value === station.city
    );
  }

  public getCityNameById(id: number): string {
    const station = this.stationList.find(stationItem => stationItem.id === id);
    return station ? station.city : '';
  }

  public onSave(): void {
    this.submitted = true;
    this.formStations.markAllAsTouched();
    if (this.formStations.valid) {
      const formValue = this.formStations.value;

      const stationToServer: StationServer = {
        city: formValue.name,
        latitude: Number(formValue.latitude),
        longitude: Number(formValue.longitude),
        relations: formValue.selectedStations
          .map((cityName: string) => {
            const station = this.stationList.find(
              stationName => stationName.city === cityName
            );
            return station?.id ?? -1;
          })
          .filter((id: number) => id !== -1),
      };

      this.addStationService.addStation(stationToServer).subscribe({
        next: response => {
          const responseWithId = response as StationResponse;
          console.log('Station successfully added to server:', response);
          const newStation: Station = {
            id: responseWithId.id,
            city: formValue.name,
            latitude: Number(formValue.latitude),
            longitude: Number(formValue.longitude),
            connectedTo: formValue.selectedStations.map((cityName: string) => ({
              id:
                this.stationList.find(station => station.city === cityName)
                  ?.id ?? 0,
              distance: 0,
            })),
          };
          newStation.connectedTo.forEach(connection => {
            const connectedStation = this.stationList.find(
              station => station.id === connection.id
            );
            if (connectedStation) {
              connectedStation.connectedTo.push({
                id: newStation.id,
                distance: 0,
              });
            }
          });
          this.store.dispatch(
            StationActions.addStation({ station: newStation })
          );
          this.stationList = [...this.stationList, newStation];
          this.formStations.reset();
          this.selectedStations.clear();
          this.addConnectedStation();
          this.submitted = false;
        },
        error: error => {
          console.error('Error adding station to server:', error);
        },
      });

      this.formStations.reset();
    }
  }

  public onDeleteStation(stationId: number): void {
    this.ordersService.getOrders().subscribe(orders => {
      const stationInActiveOrder = orders.some(
        order => order.status === 'active' && order.path.includes(stationId)
      );

      if (stationInActiveOrder) {
        this.errorStationId = stationId;
        console.error('Cannot delete station. It is part of an active order.');
        return;
      }

      this.errorStationId = null;
      this.store.dispatch(StationActions.deleteStation({ stationId }));
    });
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.formStations.get(formControlName);
    if (control && control.touched && control.invalid) {
      switch (true) {
        case control.hasError('required'):
          return 'Field is required';
        case control.hasError('pattern'):
          return 'Please enter a valid value';
        default:
          return '';
      }
    }
    return '';
  }
}
