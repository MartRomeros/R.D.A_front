import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signal } from '@angular/core';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';
import { AuthServicesService } from '../../../services/auth-services.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../models/interfaces';
import { GeneralModule } from '../../../shared/modules/general/general.module';


@Component({
  selector: 'app-login',
  imports: [GeneralModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  //Formulario de login
  loginForm!: FormGroup
  //servicio de autenticacion
  private authService = inject(AuthServicesService)
  private router = new Router()

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  //visibilidad para el campo de contraseña
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  //contador de caracteres
  showCounter(field: string): number {
    return this.loginForm.get(field)?.value.length || 0
  }


  //validar campos y mostrarlo en pantalla
  hasErrors(campo: string, typeError: string) {
    return this.loginForm.get(campo)?.touched && this.loginForm.get(campo)?.hasError(typeError)
  }

  async login() {
    //validar campos
    if (!this.validarCampos()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No es posible iniciar sesión. Por favor verifica tus credenciales",
      });
      return
    }

    const valores = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    try {

      const response: LoginResponse = await lastValueFrom(this.authService.login(valores))
      if (response.tipoUsuario === 'ALUMNO') {
        this.router.navigate(['alumno'])
      }

    } catch (error: any) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.error.message});
      console.log(error)

    }


  }


  //metodo para validar campos
  validarCampos(): boolean {

    if (this.loginForm.get('email')?.hasError('email') || this.loginForm.get('email')?.hasError('required')) {
      return false
    }

    if (this.loginForm.get('password')?.hasError('required')) {
      return false
    }

    return true
  }


}
