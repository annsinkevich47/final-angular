import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { DeleteRideModalComponent } from './components/delete-ride-modal/delete-ride-modal.component';
import { DeleteRouteModalComponent } from './components/delete-route-modal/delete-route-modal.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DeleteRouteModalComponent,
    DeleteRideModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  exports: [FormsModule, ReactiveFormsModule, HeaderComponent],
})
export class SharedModule {}
