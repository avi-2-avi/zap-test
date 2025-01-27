import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthMiddleware implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const companyId = localStorage.getItem('company_id');
    const apiToken = localStorage.getItem('api_token');

    if (!companyId || !apiToken) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
