import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupSubject = new Subject<{ isOpen: boolean; data?: string }>();
  public popupState$ = this.popupSubject.asObservable();

  public open(data: string): void {
    this.popupSubject.next({ isOpen: true, data });
  }

  public close(): void {
    this.popupSubject.next({ isOpen: false });
  }
}
