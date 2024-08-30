import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-order-modal',
  templateUrl: './cancel-order-modal.component.html',
  styleUrl: './cancel-order-modal.component.scss',
})
export class CancelOrderModalComponent {
  @Input() public orderId!: number;
  @Input() public customerId!: number; // name of customer string
  @Output() public cancelConfirmed = new EventEmitter<void>();
  @Output() public closed = new EventEmitter<void>();

  public cancelOrder() {
    this.cancelConfirmed.emit();
    this.close();
  }

  public close() {
    this.closed.emit();
  }
}
