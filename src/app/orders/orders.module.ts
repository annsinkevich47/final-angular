import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';

@NgModule({
  declarations: [
    OrdersPageComponent
  ],
  imports: [CommonModule, SharedModule, OrdersRoutingModule],
})
export class OrdersModule {}
