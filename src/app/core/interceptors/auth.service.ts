import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer rgQeD8jYiSvV13yiBZ0om6ovHHl5ZtrwPLkUZI2QSh2a`,
      },
    });
    return next.handle(authReq);
  }
}
