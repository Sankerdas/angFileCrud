import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'; // 1 importing inbuild httpinterceptor (interface)

@Injectable({
  providedIn: 'root'
})
export class TokenInsterceptorService implements HttpInterceptor { // 2 implemets httpInterceptor

  constructor() { }

  intercept(req, next) { // 3 define intercept interface method
    const tokenizedReq = req.clone({ // 4 incoming request cloned then modified
      setHeaders: {
        Autorization: 'Bearer xx.yy.zz'
      }
    });
    return next.handle(tokenizedReq); // 5
  }
}
