import { Component, Input, OnInit } from '@angular/core';
import { Station } from '../../../shared/models/stations-response.model';
import { RideType, Schedule, Segment } from '../../models/ride';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent implements OnInit {
  @Input() stations: Station[];
  @Input() rideItem: Schedule;
  @Input() ride: RideType;
  @Input() path: number[];
  @Input() segments: Segment[];

  time: string[][];

  constructor() {}

  ngOnInit(): void {
    this.getRideSegments(this.segments);
  }

  public getPathNames() {
    return this.path
      .map(id => {
        const station = this.stations?.find(item => item.id === id);
        if (station) {
          return station.city;
        }
        return null;
      })
      .filter(item => item !== null) as string[];
  }

  public getRideSegments(segments: Segment[]) {
    this.time = segments.map(({ time }) => {
      return time;
    });
    this.time.push([this.time[0][0]]);
    this.time[0] = [this.time[0][1]];
  }
}
