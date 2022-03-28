import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Parents } from './parent-interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Students } from './student-interface';

@Injectable({
  providedIn: 'root'
})
export class ParentServiceService {
  url = environment.ip;

  constructor(private http: HttpClient) { }

  createParent(parentDetails: Parents): Observable<any> {
    return this.http.post(`${this.url}/createParent`, parentDetails)
  }
  createStudent(parentDetails: Students): Observable<any> {
    return this.http.post(`${this.url}/createStudent`, parentDetails)
  }
  getStudent(id: string): Observable<any> {
    return this.http.get(`${this.url}/getStudentsById/${id}`)
  }
  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.url}/deleteStudent/${id}`)
  }
}
