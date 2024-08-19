import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';
import { RouteType } from '../../types/routeType';

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
    this.routesService.getRoutes().subscribe(data => (this.routes = data));
  }

  createCard() {
    this.isEditable = true;
  }
}
