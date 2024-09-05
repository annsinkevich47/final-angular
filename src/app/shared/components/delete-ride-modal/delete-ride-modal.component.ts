import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { deleteRide } from '../../../admin/redux/actions/ride.actions';

@Component({
  selector: 'app-delete-ride-modal',
  templateUrl: './delete-ride-modal.component.html',
  styleUrl: './delete-ride-modal.component.scss',
})
export class DeleteRideModalComponent {
  data = inject(MAT_DIALOG_DATA);
  constructor(private store: Store) {}

  delete() {
    this.store.dispatch(
      deleteRide({ rideId: this.data.rideId, routeId: this.data.routeId }),
    );
  }
}
