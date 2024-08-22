import { Component, OnInit } from '@angular/core';
import { GetStationsService } from '../../services/get-stations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import StationType from '../../models/stations';

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrl: './station-page.component.scss',
})
export class StationPageComponent implements OnInit {
  public stationsObserve$!: Observable<StationType[]>;
  public stations: StationType[] | [] = [];
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
    this.stationsObserve$ = this.getStations
      .getStations()
      .pipe(map(data => data.items));
    this.formStations = this.formBuilder.group({
      name: ['', [Validators.required]],
      latitude: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      longitude: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      connect: [''],
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
}
