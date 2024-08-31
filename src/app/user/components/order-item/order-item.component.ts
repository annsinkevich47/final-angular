import { Component, Input } from '@angular/core';

import { ITransformedOrderItem } from '../../../shared/models/orders-response.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  @Input() order!: ITransformedOrderItem;
  @Input() isManager!: boolean;
  @Input() onCancel!: (order: ITransformedOrderItem) => void;

  get isActive(): boolean {
    return this.order.status === 'active';
  }

  get isCancelled(): boolean {
    return this.order.status === 'rejected' || this.order.status === 'canceled';
  }
}
