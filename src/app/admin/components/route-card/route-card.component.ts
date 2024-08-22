import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRouteModalComponent } from '../../../shared/components/delete-route-modal/delete-route-modal.component';
import { RouteType } from '../../../shared/models/routes-response.model';
import { Station } from '../../../shared/models/stations-response.model';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent implements OnInit {
  @Input() route: RouteType;
  stations: Station[];
  readonly dialog = inject(MatDialog);

  constructor(private stationService: StationService) {}

  ngOnInit(): void {}

  getPathNames() {
    // if (this.stations) {
    //   return this.route.path
    //     .map(id => {
    //       const station = this.stations.find(station => station.id === id);
    //       if (station) {
    //         return station.city;
    //       }
    //       return null;
    //     })
    //     .filter(station => station !== null) as string[];
    // }
    return this.route.path;
  }

  openDialog(): void {
    this.dialog.open(DeleteRouteModalComponent, {
      width: '250px',
      data: {
        id: this.route.id,
      },
    });
  }
}
