import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
exportResumenAlumno(nombreArchivo: string, datos: { run: string, email: string, fono: string, horasTrabajadas: number }) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Resumen de Alumno', 14, 20);

  doc.setFontSize(12);
  doc.text(`RUN: ${datos.run}`, 14, 35);
  doc.text(`Email: ${datos.email}`, 14, 45);
  doc.text(`Fono: ${datos.fono}`, 14, 55);
  doc.text(`Horas trabajadas: ${datos.horasTrabajadas}`, 14, 65);

    doc.save(nombreArchivo);
  }
}
