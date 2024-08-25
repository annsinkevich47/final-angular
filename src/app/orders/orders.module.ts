import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersPageComponent } from '../user/pages/orders-page/orders-page.component';

@NgModule({
  declarations: [OrdersPageComponent],
  imports: [CommonModule, SharedModule],
})
export class OrdersModule {}
