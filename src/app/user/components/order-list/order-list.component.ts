import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import {
  IOrderItem,
  IProcessedOrderItem,
} from '../../../shared/models/orders-response.model';
import { IStationItem, OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  public orders: IOrderItem[] = [];
  public processedOrders: IProcessedOrderItem[] = [];
  public stations: IStationItem[] = [];
  public isManager: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.isManager = this.authService.isAdmin();
    this.loadStationsAndOrders();
  }

  public loadStationsAndOrders(): void {
    const stations$ = this.orderService.getStations();
    const orders$ = this.orderService.getOrders(this.isManager);

    forkJoin([stations$, orders$]).subscribe(([stations, orders]) => {
      this.stations = stations;
      this.orders = orders;
      this.processedOrders = this.orders.map(order => {
        const startStationIdx = order.path.indexOf(order.stationStart);
        const endStationIdx = order.path.indexOf(order.stationEnd);
        const startTime = order.schedule.segments[startStationIdx].time[0];
        const endTime = order.schedule.segments[endStationIdx - 1].time[1];

        return {
          ...order,
          startStationName: this.orderService.getStationNameById(
            this.stations,
            order.stationStart,
          ),
          endStationName: this.orderService.getStationNameById(
            this.stations,
            order.stationEnd,
          ),
          startTime,
          endTime,
          durationTime: this.orderService.calculateTripDuration(
            startTime,
            endTime,
          ),
        };
      });

      console.log(orders);
    });
  }
}
