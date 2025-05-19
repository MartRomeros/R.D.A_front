import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
exportHorasTrabajadas(nombreArchivo: string, horas: number) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Resumen de Horas Trabajadas', 14, 20);

    doc.setFontSize(12);
    doc.text(`Horas trabajadas este mes: ${horas} hrs`, 14, 40);

    doc.save(nombreArchivo);
  }
}
