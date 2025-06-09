import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaTrabajoService {
  private http = inject(HttpClient)
  private url = 'http://localhost:3000'

  traerAreasTrabajo():Observable<any>{
    return this.http.get(`${this.url}/area_trabajo/todos`,{withCredentials:true})
  }
  
}
