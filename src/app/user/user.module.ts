import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule],
})
export class UserModule {}
