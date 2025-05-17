import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesServicesService {
private alumnosSubject = new BehaviorSubject<any[]>([]);
  alumnos$ = this.alumnosSubject.asObservable();

  setAlumnos(alumnos: any[]) {
    this.alumnosSubject.next(alumnos);
  }
}
