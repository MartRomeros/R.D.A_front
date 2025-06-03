import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { AuthServicesService } from '../../../../../services/auth-services.service';
import { UserService } from '../../../../../services/user.service';
import { ActividadService } from '../../../../../services/actividad.service';
import { Actividad, User } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReportesServicesService } from '../../../../../services/reportes-services.service';


@Component({
  selector: 'app-resumen',
  imports: [GeneralModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent implements OnInit {
  //servicios
  private authService = inject(AuthServicesService)
  private userService = inject(UserService)
  private actividadService = inject(ActividadService)
  private reportesService = inject(ReportesServicesService)

  //variables publicas
  actividades!: Actividad[]
  montoAcumulado: number = 0
  montoAcumuladoFormateado!: string
  horasTrabajadas: number = 0
  fechaPago: any
  diasRestantes: any
  cargando: boolean = true
  //variables privadas

  //ngOnInit(antes de cargar el componente)
  async ngOnInit() {
    this.cargando = true
    await this.cargarActvidades()
    this.actividadService.actividades$.subscribe((actividades) => {
      this.procesarActividades(actividades)
    })    
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

  //procesa las actividades
  private procesarActividades(actividades: Actividad[]) {
    this.cargando = true
    this.actividades = actividades;
    this.montoAcumulado = 0;
    this.horasTrabajadas = 0;

    console.log(actividades)
  }

  //trae las actividades del backend (BD)
  private async cargarActvidades() {
    try {
      this.cargando = true
      //obtener usuario
      const usuario:User = await lastValueFrom(this.userService.findUserbyEmail())
      //obtener run
      const run:string = usuario.run
      //traer actividades segun el alumno
      const actividadResponse = await lastValueFrom(this.actividadService.traerActividadesByAlumno(run))
      this.actividadService.setActvidades(actividadResponse.actividades)            
    } catch (error: any) {
      alert('Error al cargar actividades')
    } finally {
      this.cargando = false
    }
  }

  exportar(tipo: 'excel' | 'pdf') {

    const datosEjemplo = {
      nombre: 'Juan',
      apellido: 'Pérez',
      run: '12.345.678-9',
      montoacumulado: 50000,
      horasrealizadas: [
        { actividad: 'Capacitación', horas: 10 },
        { actividad: 'Voluntariado', horas: 5 }
      ]
    };

    this.reportesService.descargarReporte(datosEjemplo, tipo).subscribe((blob:any) => {
      const extension = tipo === 'pdf' ? 'pdf' : 'xlsx';
      const filename = `reporte.${extension}`;
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.click();

      // Limpieza de memoria
      URL.revokeObjectURL(blobUrl);
    }, (error:any) => {
      console.error('Error al descargar el archivo', error);
    });
  }


}





