import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoutesService } from '../../../admin/services/route.service';

@Component({
  selector: 'app-modal',
  templateUrl: './delete-route-modal.component.html',
  styleUrl: './delete-route-modal.component.scss',
})
export class DeleteRouteModalComponent {
  data = inject(MAT_DIALOG_DATA);
  constructor(private routesService: RoutesService) {}

  delete() {
    this.routesService.deleteRoute(this.data.id).subscribe(
      res => res,
      err => console.error(err)
    );
  }
}
