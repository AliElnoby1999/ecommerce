import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  if(localStorage.getItem('token')!= null)
    {
    let myheaders:any={token:localStorage.getItem('token')};
    request = request.clone(
      
    {
      setHeaders:myheaders
    });
  }
    
    return next.handle(request);
  }
}
