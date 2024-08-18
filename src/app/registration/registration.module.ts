import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [CommonModule, SharedModule, RegistrationRoutingModule],
})
export class RegistrationModule {}
