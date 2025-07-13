import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurfBookingServiceService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  signUpAUser(signUpReq: any): Observable<any> {
    let url = `${this.apiUrl}/v1/user/signup`;
    return this.http.post<any>(this.apiUrl, signUpReq);
  }
}
