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
    const stations$ = this.orderService.getStationsNames();
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
          startStationName: this.getStationNameById(order.stationStart),
          endStationName: this.getStationNameById(order.stationEnd),
          startTime,
          endTime,
          durationTime: 'seconds',
        };
      });

      console.log(orders);
    });
  }

  public getStationNameById(stationId: number): string {
    const station = this.stations.find(item => item.id === stationId);
    return station ? station.city : 'Unknown Station';
  }
}
