import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { deleteRoute } from '../../../admin/redux/actions/routes.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './delete-route-modal.component.html',
  styleUrl: './delete-route-modal.component.scss',
})
export class DeleteRouteModalComponent {
  data = inject(MAT_DIALOG_DATA);
  constructor(private store: Store) {}

  delete() {
    this.store.dispatch(deleteRoute({ id: this.data.id }));
  }
}
