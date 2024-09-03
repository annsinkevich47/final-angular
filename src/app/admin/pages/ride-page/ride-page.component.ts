import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ride-page',
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
})
export class RidePageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  gotoRoutes() {
    this.router.navigateByUrl('/admin/routes');
    console.log(this.route.snapshot.params['id']);
  }
}
