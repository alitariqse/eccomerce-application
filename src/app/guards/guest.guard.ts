import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {
        if (this.authService.isAuthenticated()) {
            let currentUserData: any = JSON.parse(localStorage.getItem('currentUserData') || '{}');
            if (currentUserData) {
                if (currentUserData.role == 'admin') {
                    return this.router.createUrlTree(['/admin']);
                } else {
                    return this.router.createUrlTree(['/']);
                }
            } else {
                return this.router.createUrlTree(['/login']);
            }
        } else {
            return true;
        }
    }
}
