import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import {
  IOrderItem,
  ITransformedCarriage,
  ITransformedOrderItem,
} from '../../../shared/models/orders-response.model';
import { IStationItem } from '../../../shared/models/station.model';
import { OrderService } from '../../services/order.service';

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
  public selectedOrder: ITransformedOrderItem | null = null;
  public isModalVisible: boolean = false;

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
        this.transformedOrders = this.orders.map(order =>
          this.createTransformedOrder(order, carriages),
        );

        this.transformedOrders = this.orderService.sortTransformedOrders(
          this.transformedOrders,
        );
      },
    );
  }

  public openCancelModal(order: ITransformedOrderItem): void {
    this.selectedOrder = order;
    this.isModalVisible = true;
  }

  public cancelOrder(orderId: number) {
    console.log('Cancelling order:', orderId);
  }

  private createTransformedOrder(
    order: IOrderItem,
    carriages: ITransformedCarriage[],
  ): ITransformedOrderItem {
    const startStationIdx = order.path.indexOf(order.stationStart);
    const endStationIdx = order.path.indexOf(order.stationEnd);
    const startTime = order.schedule.segments[startStationIdx].time[0];
    const endTime = order.schedule.segments[endStationIdx - 1].time[1];
    const { carriageCode, carriageName, seatNumber, carriageIndex } =
      this.orderService.findCarriageAndSeat(order, carriages)!;

    return {
      id: order.id,
      userId: order.userId,
      status: order.status,
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
      durationTime: this.orderService.calculateTripDuration(startTime, endTime),
      carriageName,
      carNumber: carriageIndex,
      seatNumber,
      price: this.orderService.calculatePrice(
        order,
        startStationIdx,
        endStationIdx,
        carriageCode,
      ),
    };
  }
}
