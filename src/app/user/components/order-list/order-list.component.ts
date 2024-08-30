import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import {
  IOrderItem,
  ITransformedOrderItem,
} from '../../../shared/models/orders-response.model';
import { IStationItem, OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  public orders: IOrderItem[] = [];
  public transformedOrders: ITransformedOrderItem[] = [];
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
    const carriages$ = this.orderService.getTransformedCarriages();

    forkJoin([stations$, orders$, carriages$]).subscribe(
      ([stations, orders, carriages]) => {
        this.stations = stations;
        this.orders = orders;
        this.transformedOrders = this.orders.map(order => {
          const startStationIdx = order.path.indexOf(order.stationStart);
          const endStationIdx = order.path.indexOf(order.stationEnd);
          const startTime = order.schedule.segments[startStationIdx].time[0];
          const endTime = order.schedule.segments[endStationIdx - 1].time[1];
          const carriageInfo = this.orderService.findCarriageAndSeat(
            order,
            carriages,
          );

          const carriageType = carriageInfo ? carriageInfo.carriageType : '';
          const seatNumber = carriageInfo ? carriageInfo.seatNumber : '';
          const carNumber = carriageInfo ? carriageInfo.carriageIndex : '';

          return {
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
            carriageType,
            carNumber,
            seatNumber,
          };
        });

        this.transformedOrders = this.orderService.sortProcessedOrders(
          this.transformedOrders,
        );

        console.log(this.transformedOrders);
        console.log(this.orders);
      },
    );
  }

  // public createOrder() {
  //   return this.orderService.createOrder().subscribe();
  // }
}
