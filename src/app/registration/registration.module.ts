import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [RegistrationPageComponent, RegistrationFormComponent],
  imports: [CommonModule, SharedModule, RegistrationRoutingModule],
})
export class RegistrationModule {}
