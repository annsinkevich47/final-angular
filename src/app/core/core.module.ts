import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
