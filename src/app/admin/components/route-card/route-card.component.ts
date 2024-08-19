import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRouteModalComponent } from '../../../shared/components/delete-route-modal/delete-route-modal.component';
import { RouteType } from '../../types/routeType';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent {
  @Input() route: RouteType;
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(DeleteRouteModalComponent, {
      width: '250px',
      data: {
        id: this.route.id,
      },
    });
  }
}
