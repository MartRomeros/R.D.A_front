import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Reporte } from "./reporte.model";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ReportesServicesService } from "../../../../services/reportes-services.service";

@Component({
  selector: "app-reportes-tablas",
  imports: [
    MatPaginator,
    MatSort,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: "./reportes-tablas.component.html",
  styleUrl: "./reportes-tablas.component.css",
})

export class ReportesTablasComponent implements OnInit {
  
  displayedColumns: string[] = [
    "select",
    "codigo",
    "alumno",
    "asignatura",
    "tipo",
    "fecha",
    "estado",
    "horas",
    "acciones",
  ];
  dataSource = new MatTableDataSource<Reporte>([]);
  selection = new Set<string>(); // IDs seleccionados

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isAllSelected() {
    const numSelected = this.selection.size;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.dataSource.data.forEach(item => this.selection.add(item.id));
  }
  constructor(private ReportesServicesService: ReportesServicesService) {}

  // Se ejecuta al inicializar el componente, para cargar los datos en otras paginas
  ngOnInit() {
    this.dataSource.data = this.getData();
    this.ReportesServicesService.setAlumnos(this.dataSource.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

//Estos son los datos de ejemplo que se muestran en la tabla
//Despues se pueden reemplazar con los datos reales que se obtengan la API o servicio
getData(): Reporte[] {
    return [
      {
        id: "1",
        codigo: "REP-2023-001",
        alumno: "Camila Rojas",
        asignatura: "Programación",
        tipo: "Ayudantía en Laboratorio",
        fecha: "15/04/2023",
        estado: "aprobado",
        horas: 8,
      },
      {
        id: "2",
        codigo: "REP-2023-002",
        alumno: "Juan Pérez",
        asignatura: "Matemáticas",
        tipo: "Ayudantía en Laboratorio",
        fecha: "20/04/2023",
        estado: "pendiente",
        horas: 4,
      },
      {
        id: "3",
        codigo: "REP-2023-003",
        alumno: "María López",
        asignatura: "Física",
        tipo: "Ayudantía en Laboratorio",
        fecha: "25/04/2023",
        estado: "rechazado",
        horas: 6,
      },
      {
        id: "4",
        codigo: "REP-2023-004",
        alumno: "Pedro González",
        asignatura: "Química",
        tipo: "Ayudantía en Laboratorio",
        fecha: "30/04/2023",
        estado: "aprobado",
        horas: 10,
      },
      {
        id: "5",
        codigo: "REP-2023-005",
        alumno: "Ana Torres",
        asignatura: "Biología",
        tipo: "Ayudantía en Laboratorio",
        fecha: "05/05/2023",
        estado: "pendiente",
        horas: 5,
      },
      {
        id: "6",
        codigo: "REP-2023-006",
        alumno: "Luis Fernández",
        asignatura: "Historia",
        tipo: "Ayudantía en Laboratorio",
        fecha: "10/05/2023",
        estado: "rechazado",
        horas: 7,
      },
      {
        id: "7",
        codigo: "REP-2023-007",
        alumno: "Sofía Martínez",
        asignatura: "Geografía",
        tipo: "Ayudantía en Laboratorio",
        fecha: "15/05/2023",
        estado: "aprobado",
        horas: 9,
      },
      // ...agrega los demás registros
    ];
  }

  toggleSelection(id: string) {
    this.selection.has(id) ? this.selection.delete(id) : this.selection.add(id);
  }

  isSelected(id: string): boolean {
    return this.selection.has(id);
  }

  copiarId(codigo: string) {
    navigator.clipboard.writeText(codigo);
    alert("ID copiado al portapapeles: " + codigo)
  }

  
}
