import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public currentDateTime: string;

  constructor() {
    const now = new Date();
    this.currentDateTime = now.toISOString().slice(0, 16);
  }
}
