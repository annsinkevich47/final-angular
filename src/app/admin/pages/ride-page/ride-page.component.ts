import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ride-page',
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
})
export class RidePageComponent {
  public routeId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.routeId = this.route.snapshot.params['id'];
  }

  gotoRoutes() {
    this.router.navigateByUrl('/admin/routes');
  }
}
