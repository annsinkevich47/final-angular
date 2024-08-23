import { Component, OnInit } from '@angular/core';
import { GetStationsService } from '../../services/get-stations.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import StationType from '../../models/stations';

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrl: './station-page.component.scss',
})
export class StationPageComponent implements OnInit {
  public stationsObserve$!: Observable<StationType[]>;
  public stationList: StationType[] | [] = [];
  public formStations!: FormGroup;
  public connectedStations = [
    'London',
    'Leicester',
    'Nottingham',
    'Birmingham',
  ];

  constructor(
    public getStations: GetStationsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.stationsObserve$ = this.getStations.getStations().pipe(
      map(data => {
        this.stationList = data.items;
        return data.items;
      })
    );
    this.formStations = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-zs]+$')]],
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
      // connect: [this.formBuilder.array([])],
    });
  }

  public getAllStations(): void {
    this.getStations.getStations().subscribe({
      next: data => {
        console.log('Stations:', data.items);
      },
      error: err => {
        console.error('Error: stations not received', err);
      },
    });
  }

  public getCityNameById(id: number): string {
    const station = this.stationList.find(station => station.id === id);
    return station ? station.city : 'Unknown';
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.formStations.get(formControlName);
    if (control && control.touched && control.invalid) {
      switch (true) {
        case control.hasError('required'):
          console.log('g');
          return 'Field is required';
        case control.hasError('pattern'):
          console.log('h');
          return 'Please enter a number';
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
