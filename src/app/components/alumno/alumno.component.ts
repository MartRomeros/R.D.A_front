import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from "@angular/material/select"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AuthServicesService } from '../../services/auth-services.service';
import { lastValueFrom } from 'rxjs';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatTimepickerModule } from '@angular/material/timepicker';

type Mes = {
  nombre: string;
  numero: number;
};

@Component({
  selector: 'app-alumno',
  imports: [MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatSelectModule, FormsModule, HeaderComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTimepickerModule],
  templateUrl: './alumno.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './alumno.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumnoComponent {

  private router = new Router()
  private authService = inject(AuthServicesService)
  private userService = inject(UserService)
  private fb = inject(FormBuilder)


  actividadForm: FormGroup = this.fb.group({
    fecha: [''],
    horaInic: [''],
    horaTerm: ['']
  })

  nombreAlumno = ''

  fechaActual = new Date();
  mesActual = this.fechaActual.getMonth(); // 0 = enero

  meses: { nombre: string; numero: number }[] = Array.from(
    { length: this.mesActual + 1 },
    (_, i) => {
      const fecha = new Date(2000, i); // cualquier año sirve para obtener el nombre del mes
      return {
        nombre: fecha.toLocaleString('es-ES', { month: 'long' }),
        numero: i + 1
      };
    }
  );


  horas = [
    { fecha: '01/01/204', horaInicio: '18:00', horaTermino: '21:00', area: 'difusion' }
  ]
  displayedColumns: string[] = ['fecha', 'horaInicio', 'horaTermino', 'area']
  dataSource = this.horas

  ngOnInit() {
    this.obtenerUsuario()
  }




  isMobile(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  obtenerMesesPorAño(año: number): Mes[] {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();

    if (año > añoActual) {
      // Si el año es en el futuro, retorna arreglo vacío
      return [];
    }

    // Determina cuántos meses incluir (hasta el mes actual si es el mismo año)
    const limiteMeses = año === añoActual ? fechaActual.getMonth() + 1 : 12;

    // Genera el arreglo de meses
    const meses: Mes[] = Array.from({ length: limiteMeses }, (_, i) => {
      const fecha = new Date(año, i);
      const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });

      return {
        nombre: nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1), // Capitaliza
        numero: i + 1
      };
    });

    return meses;
  }

  async obtenerUsuario() {
    try {

      const response = await lastValueFrom(this.authService.isAuthenticated())
      const response2 = await lastValueFrom(this.userService.findUserbyEmail())
      console.log(response2)
      this.nombreAlumno = `${response2.nombre} ${response2.apellido_paterno}`
      console.log(this.nombreAlumno)

      if (!response.isAuthenticated) {
        console.log('error en la autenticacion!')
        this.router.navigate(['/login'])
        return
      }


    } catch (error: any) {
      console.log(error)
    }
  }

  async registrarHora(){
    console.log(this.actividadForm.value)

  }


}
