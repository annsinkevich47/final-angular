import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
