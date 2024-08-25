import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegistrationPageComponent } from '../user/pages/registration-page/registration-page.component';

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [CommonModule, SharedModule],
})
export class RegistrationModule {}
