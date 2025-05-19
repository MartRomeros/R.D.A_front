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
import { MatPaginatorModule, MatPaginatorIntl } from "@angular/material/paginator";

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
    MatPaginatorModule,
  ],
  templateUrl: "./reportes-tablas.component.html",
  styleUrl: "./reportes-tablas.component.css",
  providers: [{ provide: MatPaginatorIntl, useClass: ReportesServicesService }],
})

export class ReportesTablasComponent implements OnInit {
  
  displayedColumns: string[] = [
    "select",
    "rut",
    "alumno",
    "fono",
    "correo",
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
        rut: "18.153.798-5",
        alumno: "Camila Rojas",
        fono: 123456789,
        correo: "Ayudantía en Laboratorio",
        horas: 8,
      },
      {
        id: "2",
        rut: "20.349.287-5",
        alumno: "Juan Pérez",
        fono: 123456789,
        correo: "Ayudantía en Laboratorio",
        horas: 4,
      },
      {
        id: "3",
        rut: "21.468.135-5",
        alumno: "María López",
        fono: 123456789,
        correo: "Ayudantía en Laboratorio",
        horas: 6,
      },
      {
        id: "4",
        rut: "20.159.645-K",
        alumno: "Pedro González",
        fono: 123456789,
        correo: "Ayudantía en Laboratorio",
        horas: 10,
      },
      {
        id: "5",
        rut: "19.546.456-7",
        alumno: "Ana Torres",
        fono: 123456789,
        correo: "Ayudantía en Laboratorio",
        horas: 5,
      },
      {
        id: "6",
        rut: "21.348.654-9",
        alumno: "Luis Fernández",
        fono: 123456789,
        correo: "Ayudantía en Laboratorio",
        horas: 7,
      },
      {
        id: "7",
        rut: "21.468.672-2",
        alumno: "Sofía Martínez",
        fono: 123456789,
        correo: "Ayudantía en Laboratorio",
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
