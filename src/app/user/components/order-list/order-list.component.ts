import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import {
  IOrderItem,
  ITransformedCarriage,
  ITransformedOrderItem,
} from '../../../shared/models/orders-response.model';
import { IUser } from '../../../shared/models/profile-response.model';
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
  public users: IUser[] = [];
  public selectedUserName: string = '';

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.isManager = this.authService.isAdmin();
    this.loadStationsAndOrders();

    if (this.isManager) {
      this.loadUsers();
    }
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

  public loadUsers(): void {
    this.orderService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public openCancelModal(order: ITransformedOrderItem): void {
    this.selectedOrder = order;

    if (this.isManager) {
      this.selectedUserName = this.orderService.getUserName(
        this.users,
        order.userId,
      );
    }

    this.isModalVisible = true;
  }

  public cancelOrder(orderId: number): void {
    this.orderService.cancelActiveOrder(orderId).subscribe({
      next: () => {
        this.loadStationsAndOrders();
        this.isModalVisible = false;
        this.toastr.success('Order successfully cancelled', 'Order Status', {
          timeOut: 2500,
        });
      },
      error: error => {
        this.toastr.error(`${error.error.message}`, 'Order Status', {
          timeOut: 2500,
        });
      },
    });
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
    const userName = this.orderService.getUserName(this.users, order.userId);

    return {
      id: order.id,
      userId: order.userId,
      userName,
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
