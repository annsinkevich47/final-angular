import { CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { CarriageItemComponent } from './components/carriage-item/carriage-item.component';
import { EditableInputComponent } from './components/editable-input/editable-input.component';
import { RideCardComponent } from './components/ride-card/ride-card.component';
import { RouteCardComponent } from './components/route-card/route-card.component';
import { RouteCreateFormComponent } from './components/route-create-form/route-create-form.component';
import { RouteEditFormComponent } from './components/route-edit-form/route-edit-form.component';
import { AdminComponent } from './pages/admin.component';
import { CarriagesPageComponent } from './pages/carriages-page/carriages-page.component';
import { RidePageComponent } from './pages/ride-page/ride-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { StationPageComponent } from './pages/station-page/station-page.component';
import { EditablePriceInputsComponent } from './components/editable-price-inputs/editable-price-inputs.component';

@NgModule({
  declarations: [
    StationPageComponent,
    CarriagesPageComponent,
    RoutesPageComponent,
    AdminNavigationComponent,
    CarriageItemComponent,
    AdminComponent,
    RouteCardComponent,
    RouteCreateFormComponent,
    RouteEditFormComponent,
    RidePageComponent,
    RideCardComponent,
    EditableInputComponent,
    EditablePriceInputsComponent,
  ],
  imports: [
    KeyValuePipe,
    DatePipe,
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
})
export class AdminModule {}
