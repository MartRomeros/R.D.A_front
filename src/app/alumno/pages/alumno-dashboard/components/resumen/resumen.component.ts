import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { ActividadService } from '../../../../../services/alumno/actividad.service';
import { Actividad, DetallesAlumno, User } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResumenMes } from '../../models/interfaces';
import { AlumnoService } from '../../../../../services/alumno/alumno.service';


@Component({
  selector: 'app-resumen',
  imports: [GeneralModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent implements OnInit {
  //servicios
  private actividadService = inject(ActividadService)
  private alumnoService = inject(AlumnoService)

  //variables publicas
  montoAcumulado?: string
  horasTrabajadas?: number
  fechaPago: any
  diasRestantes: any
  cargando: boolean = true
  mesActual = new Intl.DateTimeFormat('es-CL', { month: 'long' }).format(new Date()).toString()
  //variables privadas


  //ngOnInit(antes de cargar el componente)
  async ngOnInit() {
    this.cargando = true
    await this.traerResumenMes()
    this.traerFechaAproxPago()
    this.cargando = false
  }


  private traerFechaAproxPago() {
    this.cargando = true
    const hoy = new Date();
    let añoActual = hoy.getFullYear();
    let mes = hoy.getMonth(); // 0 = enero

    for (let intento = 0; intento < 2; intento++) {
      // Buscar entre el 15 y el 21 (tercera semana)
      for (let dia = 15; dia <= 21; dia++) {
        const fecha = new Date(añoActual, mes, dia);
        if (fecha.getDay() === 5) { // 5 = viernes
          // Verificar si la fecha aún no ha pasado
          if (fecha >= hoy) {
            const diferenciaMs = fecha.getTime() - hoy.getTime();
            const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
            this.diasRestantes = diasRestantes;

            const opciones = new Intl.DateTimeFormat('es-CL', {
              day: 'numeric',
              month: 'long'
            }).format(fecha);

            this.fechaPago = opciones;
            return; // Salir del loop una vez encontrada la fecha válida
          }
        }
      }

      // Si no se encontró o ya pasó, pasar al siguiente mes
      mes++;
      if (mes > 11) {
        mes = 0;
        añoActual++;
      }
    }
  }

  private async traerResumenMes() {
    try {
      const response: ResumenMes = await lastValueFrom(this.alumnoService.traerResumenMes());
      this.montoAcumulado = response.montoFormateado
      this.horasTrabajadas = response.horasMes
    } catch (error: any) {
      console.log(error);
    }
  }

  formatearCLP(valor: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor)
  }


}





