import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ITrip } from '../../models/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  public subscriptionTrip: Subscription | undefined;
  public tripData: ITrip | null = null;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptionTrip = this.searchService.tripData$.subscribe(value => {
      this.tripData = value;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionTrip?.unsubscribe();
  }
}
