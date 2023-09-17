import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    logout() {
        localStorage.removeItem('currentUserData')
    }
    
    isAuthenticated() {
        let currentUserData: any = JSON.parse(localStorage.getItem('currentUserData') || '{}');
        if (currentUserData && currentUserData.role) {
            return true;
        } else {
            return false
        }
    }
}
