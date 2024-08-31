import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DeleteRouteModalComponent } from '../../../shared/components/delete-route-modal/delete-route-modal.component';
import { RouteType } from '../../../shared/models/routes-response.model';
import { Station } from '../../../shared/models/stations-response.model';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent {
  @Input() route: RouteType;
  @Input() stations: Station[];
  readonly dialog = inject(MatDialog);

  getPathNames() {
    return this.route.path
      .map(id => {
        const station = this.stations?.find(item => item.id === id);
        if (station) {
          return station.city;
        }
        return null;
      })
      .filter(station => station !== null) as string[];
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
