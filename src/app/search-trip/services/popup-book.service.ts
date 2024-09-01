import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IBookMsg } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PopupBookService {
  public isOpen$ = new Subject<boolean>();
  public bookMsg$ = new Subject<IBookMsg | null>();

  public open(bookMsg: IBookMsg): void {
    this.isOpen$.next(true);
    this.bookMsg$.next(bookMsg);
  }

  public close(): void {
    this.isOpen$.next(false);
    setTimeout(() => {
      this.bookMsg$.next(null);
    }, 350);
  }
}
