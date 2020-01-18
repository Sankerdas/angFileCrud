import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }
  canActivate(): boolean {
    const isLoggin = !!localStorage.getItem('token'); // checking token returns true/false
    console.log(isLoggin);
    if (isLoggin) {
      return true;
    } else {
      this.router.navigate(['/user-login']);
      return false;
    }
  }
}
