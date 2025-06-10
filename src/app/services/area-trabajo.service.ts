import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AreaTrabajo } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AreaTrabajoService {
  private http = inject(HttpClient)
  private url = 'http://localhost:3000'

  private areasTrabajoSubject = new BehaviorSubject<AreaTrabajo[]>([])
  areasTrabajo$ = this.areasTrabajoSubject.asObservable()

  setareasTrabajo(areasTrabajo:AreaTrabajo[]){
    this.areasTrabajoSubject.next(areasTrabajo)
  }

  traerAreasTrabajo():Observable<any>{
    return this.http.get(`${this.url}/area_trabajo/todos`,{withCredentials:true})
  }
  
}
