import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
url = environment.ip;
  constructor(private http: HttpClient) { }

  getAllStudents(){
    return this.http.get(`${this.url}/getAllStudents`);
  }

  updateStudentStatus(data){
    return this.http.post(`${this.url}/updateStudentStatus`,data);
  }
}
