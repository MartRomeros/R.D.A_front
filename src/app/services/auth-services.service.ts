import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000'

  login(valores: any): Observable<any> {
    return this.http.post(`${this.localUrl}/auth/login`, valores)
  }

}
