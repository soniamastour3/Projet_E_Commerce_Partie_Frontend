import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../component/model/login-request';
import { Provider } from '../component/model/provider';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenKey: string = 'authToken'; // Clé pour stocker le token dans localStorage



  constructor(private http: HttpClient, private router: Router ) { }

  Registre(provider: Provider): Observable<Provider>{
    return this.http.post<Provider>(`${environment.url}/api/auth/signupProvider`, provider);
  }

  login(request: LoginRequest):Observable<any>{
    return this.http.post<any>(`${environment.url}/api/auth/signinProvider`, request)
    
  }
  getprovider(id: number): Observable<Provider>{

    return this.http.get<Provider>(`${environment.url}/providers/getone/${id}`)
}
getImageUrl1(filename: string) {
  return `${environment.url}/products/images/${encodeURIComponent(filename)}`; 
}





isAuthenticated(): boolean {
  // Vérifiez ici si l'utilisateur est authentifié, par exemple en vérifiant un token JWT.
  return !!localStorage.getItem('authToken');
}

logout(): void {
  localStorage.removeItem(this.tokenKey);
  this.router.navigate(['']);
}

}
 

