import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-popup-stations',
  templateUrl: './popup-stations.component.html',
  styleUrl: './popup-stations.component.scss',
})
export class PopupStationsComponent implements OnInit, OnDestroy {
  public isOpen = false;
  public data: string = '';
  private subscriptionData: Subscription | undefined;

  constructor(private popupService: PopupService) {}

  public ngOnInit(): void {
    this.subscriptionData = this.popupService.popupState$.subscribe(state => {
      console.log(state);

      this.isOpen = state.isOpen;
      this.data = state.data ? state.data : '';
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionData?.unsubscribe();
  }

  public closePopup(): void {
    this.popupService.close();
  }
}
