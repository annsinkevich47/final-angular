import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/pages/admin.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./search/search.module').then(m => m.SearchModule),
      },
      {
        path: 'signin',
        loadChildren: () =>
          import('./login/login.module').then(m => m.LoginModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./registration/registration.module').then(
            m => m.RegistrationModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then(m => m.OrdersModule),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin.module').then(m => m.AdminModule),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
