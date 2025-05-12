import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000'

  findUserbyEmail(): Observable<any> {
    return this.http.get(`${this.localUrl}/user/user/email`,{withCredentials:true})
  }



}
