import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../component/model/customer';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../component/model/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  Registre(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(`${environment.url}/api/auth/signupCustomer`, customer)
  }
  login(request: LoginRequest):Observable<any>{
    return this.http.post<any>(`${environment.url}/api/auth/signinCustomer`, request)
    
  }
}
