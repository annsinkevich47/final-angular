import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IScheduleTrip } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  public isOpen$ = new Subject<boolean>();
  public scheduleTrip$ = new Subject<IScheduleTrip | null>();

  public open(scheduleTrip: IScheduleTrip): void {
    this.isOpen$.next(true);
    this.scheduleTrip$.next(scheduleTrip);
  }

  public close(): void {
    this.isOpen$.next(false);
    setTimeout(() => {
      this.scheduleTrip$.next(null);
    }, 350);
  }
}
