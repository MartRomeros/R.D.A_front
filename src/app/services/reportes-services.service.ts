import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesServicesService {

  private http = inject(HttpClient)
  private url = 'http://localhost:8000/export-excel'
  private nodeUrl = 'https://rda-server-production.up.railway.app'

  exportToExcel(data: any) {
    return this.http.post('http://localhost:8000/export-excel', { data }, {
      responseType: 'blob'  // Indicamos que es archivo binario
    });
  }

  traerDatosAExportar():Observable<any>{
    return this.http.get(`${this.nodeUrl}/admin/exportar`,{withCredentials:true})
  }

}
