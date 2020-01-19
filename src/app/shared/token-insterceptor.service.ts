import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'; // 1 importing inbuild httpinterceptor (interface)

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInsterceptorService implements HttpInterceptor { // 2 implemets httpInterceptor

  constructor(private injector: Injector) { }

  intercept(req, next) { // 3 define intercept interface method
    const dataService = this.injector.get(DataService);
    const tokenizedReq = req.clone({ // 4 incoming request cloned then modified
      setHeaders: {
        Autorization: `Bearer ${dataService.getToken()}`
      }
    });
    return next.handle(tokenizedReq); // 5
  }
}
