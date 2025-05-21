import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesServicesService {

  private http = inject(HttpClient)
  private url = 'http://localhost:8000/api/exportar/'

  descargarReporte(data: any, tipo: 'excel' | 'pdf'): Observable<Blob> {
    return this.http.post(this.url, { tipo, data }, { responseType: 'blob' })
  }

}
