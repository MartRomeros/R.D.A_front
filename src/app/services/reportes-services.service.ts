import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ReportesServicesService extends MatPaginatorIntl {
  override itemsPerPageLabel = "Elementos por página:";
  override nextPageLabel = "Página siguiente";
  override previousPageLabel = "Página anterior";
  override firstPageLabel = "Primera página";
  override lastPageLabel = "Última página";

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  private alumnosSubject = new BehaviorSubject<any[]>([]);
  alumnos$ = this.alumnosSubject.asObservable();

  setAlumnos(alumnos: any[]) {
    this.alumnosSubject.next(alumnos);
  }
}
