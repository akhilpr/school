import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validateUser(user: any) {
    return this.http
      .post('http://localhost:3000/validateParent', user)
  }

  validateAdmin(user: any) {
    return this.http
      .post('http://localhost:3000/validateAdmin', user)
  }
}
