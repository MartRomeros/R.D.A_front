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

  //variables publicas
  actividades!: Actividad[]
  montoAcumulado: number = 0
  montoAcumuladoFormateado!: string
  horasTrabajadas: number = 0
  fechaPago: any
  diasRestantes: any
  cargando: boolean = true
  usuario!: User;

  //ngOnInit(antes de cargar el componente)
  async ngOnInit() {
    this.cargando = true
    this.actividadService.actividades$.subscribe((actividades) => {
      this.procesarActividades(actividades)
    })
    await this.CargarActvidades()
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

    actividades.forEach((actividad) => {
      const [hInic, mInic] = actividad.hora_inic_activdad.split(':').map(Number);
      const [hTerm, mTerm] = actividad.hora_term_actividad.split(':').map(Number);
      const diferenciaMinutos = Math.abs((hTerm * 60 + mTerm) - (hInic * 60 + mInic));
      const diferenciaHoras = diferenciaMinutos / 60;
      this.horasTrabajadas += diferenciaHoras;
      this.montoAcumulado += diferenciaHoras * 2450;
    });

    this.montoAcumuladoFormateado = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(this.montoAcumulado);

    this.cargando = false;
  }

  //trae las actividades del backend (BD)
  private async CargarActvidades() {
    try {
      this.cargando = true
      //obtiene el usuario por mail
      const usuario: User = await lastValueFrom(this.userService.findUserbyEmail());
      this.usuario = usuario; // <--- aquí se guarda el usuario en una variable publica
      //obtener el run del usuario
      const run: string = usuario.run;
      //trae las actividades actuales del usuario
      const actvidadesResponse = await lastValueFrom(this.actividadService.traerActividadesByAlumno(run));
      //actualiza las actividades
      this.actividadService.setActvidades(actvidadesResponse.actividades);
    } catch (error: any) {
      alert('Error al cargar actividades');
    } finally {
      this.cargando = false
    }
  }

  //metodo para exportar excel o pdf a eleccion
  /*exportar(formato: 'excel' | 'pdf') {
  }*/




}
