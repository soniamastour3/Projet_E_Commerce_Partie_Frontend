import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileRequest } from '../../model/profile-request';
import { environment } from '../../../../environments/environment.development';
import { Provider } from '../../model/provider';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {


   }


   updateprovider(id: number, request: ProfileRequest):Observable<any>{
    return this.http.put<any>(`${environment.url}/providers/updatewithimage/${id}`, request)
  }

  getproduct(id: number): Observable<Provider>{

    return this.http.get<Provider>(`${environment.url}/providers/getone/${id}`)
}
}
