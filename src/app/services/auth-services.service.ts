import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  //servicios
  private router:Router = new Router()

  private http = inject(HttpClient)
  private localUrl = 'https://r-d-a-server.onrender.com'
  private rendelUrl = 'https://r-d-a-server-1.onrender.com'

  login(valores: any): Observable<any> {
    return this.http.post(`${this.localUrl}/auth/login`, valores, { withCredentials: true })
  }

  logout(): Observable<any> {
    return this.http.post(`${this.localUrl}/auth/logout`, {}, { withCredentials: true })
  }

  recuperarClave(email: string): Observable<any> {
    return this.http.put(`${this.localUrl}/auth/forgot_password`, { email: email })
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.localUrl}/auth/is_authenticated`, { withCredentials: true })
  }

  goToLogin(){
    this.router.navigate(['login'])
  }  

}
