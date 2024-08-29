import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  public orders = [];
  public isManager: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.isManager = this.authService.isAdmin();
    this.loadOrders();
  }

  public loadOrders(): void {
    this.orderService.getOrders(this.isManager).subscribe(orders => {
      console.log(orders);
    });
  }
}
