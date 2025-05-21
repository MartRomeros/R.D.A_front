import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  exportResumenAlumno(nombreArchivo: string, datos: { run: string, email: string, fono: string, horasTrabajadas: number }) {
    const data = [
    {
      'RUN': datos.run,
      'Email': datos.email,
      'Fono': datos.fono,
      'Horas trabajadas': datos.horasTrabajadas
    }
  ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resumen');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, nombreArchivo);
  }
}
