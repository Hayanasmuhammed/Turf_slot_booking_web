import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurfBookingServiceService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  userSignup(signUpReq: any): Observable<any> {
    let url = `${this.apiUrl}/v1/user/signup`;
    return this.http.post<any>(url, signUpReq);
  }

  userLogin(signUpReq: any): Observable<any> {
    let url = `${this.apiUrl}/v1/user/login`;
    return this.http.post<any>(url, signUpReq);
  }

  sendOtp(email:string): Observable<any> {
    console.log('Sending OTP to:', email);
    
    let url = `${this.apiUrl}/v1/email/${email}/forgot_password`;
    return this.http.get<any>(url);
  }
}
