import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class AuthService {

  public loggedInStatus = new BehaviorSubject(false);
  public isAdmin = new BehaviorSubject(false);

  get LoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn')) || false;
  }

    isLogin(item) { 
     this.loggedInStatus.next(item);
  }
  isAdminvalid(item) { 
    this.isAdmin.next(item);
 }
}