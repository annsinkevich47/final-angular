import { Component, OnInit } from '@angular/core';
import { RouteType } from '../../../shared/models/routes-response.model';
import { RoutesService } from '../../services/route.service';

@Component({
  selector: 'app-routes-page',
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
  styleUrl: './routes-page.component.scss',
})
export class RoutesPageComponent {}
export class RoutesPageComponent implements OnInit {
  routes: RouteType[];
  isEditable: boolean = false;

  constructor(private routesService: RoutesService) {}

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe(data => {
      this.routes = data;
    });
  }

  createCard() {
    this.isEditable = true;
  }
}
