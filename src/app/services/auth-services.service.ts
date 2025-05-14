import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000'
  private rendelUrl = 'https://r-d-a-server-1.onrender.com'

  login(valores: any): Observable<any> {
    return this.http.post(`${this.rendelUrl}/auth/login`, valores, { withCredentials: true })
  }

  logout(): Observable<any> {
    return this.http.post(`${this.rendelUrl}/auth/logout`, {}, { withCredentials: true })
  }

  recuperarClave(email: string): Observable<any> {
    return this.http.put(`${this.rendelUrl}/auth/forgot-password`, { email: email })
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.rendelUrl}/auth/is-authenticated`, { withCredentials: true })
  }

}
