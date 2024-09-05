import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { DeleteRouteModalComponent } from '../../../shared/components/delete-route-modal/delete-route-modal.component';
import { RouteType } from '../../../shared/models/routes-response.model';
import { Station } from '../../../shared/models/stations-response.model';
import CarriageType from '../../models/carriage';
import {
  setFormState,
  setFormType,
} from '../../redux/actions/routes-form.actions';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent {
  @Input() route: RouteType;
  @Input() stations: Station[];
  @Input() carriages: CarriageType[];
  readonly dialog = inject(MatDialog);

  constructor(public store: Store) {}

  public getCarriageNames(): string[] {
    return this.route.carriages
      .map(code => {
        const carriage = this.carriages.find(item => item.code === code);
        if (carriage) {
          return carriage.name;
        }
        return null;
      })
      .filter(item => item !== null) as string[];
  }

  public getPathNames(): string[] {
    return this.route.path
      .map(id => {
        const station = this.stations?.find(item => item.id === id);
        if (station) {
          return station.city;
        }
        return null;
      })
      .filter(item => item !== null) as string[];
  }

  public openDialog(): void {
    this.dialog.open(DeleteRouteModalComponent, {
      width: '250px',
      data: {
        id: this.route.id,
      },
    });
  }

  public onUpdate(): void {
    this.store.dispatch(setFormType({ formType: 'update' }));
    this.store.dispatch(setFormState({ formState: this.route }));
  }
}
