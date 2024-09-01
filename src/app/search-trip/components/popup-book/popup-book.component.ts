import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IBookMsg } from '../../models/models';
import { PopupBookService } from '../../services/popup-book.service';

@Component({
  selector: 'app-popup-book',
  templateUrl: './popup-book.component.html',
  styleUrl: './popup-book.component.scss',
})
export class PopupBookComponent implements OnInit, OnDestroy {
  public isOpen = false;
  public bookMsg: IBookMsg | null = null;
  private subscriptionIsOpen: Subscription | undefined;
  private subscriptionBookMsg: Subscription | undefined;

  constructor(private popupBook: PopupBookService) {}

  public ngOnInit(): void {
    this.subscriptionIsOpen = this.popupBook.isOpen$.subscribe(value => {
      this.isOpen = value;
    });
    this.subscriptionBookMsg = this.popupBook.bookMsg$.subscribe(array => {
      this.bookMsg = array;
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionIsOpen?.unsubscribe();
    this.subscriptionBookMsg?.unsubscribe();
  }

  public closePopup(): void {
    this.popupBook.close();
  }
}
