import { Component, inject, signal } from '@angular/core';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { LoginResponse } from '../../../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from '../../../services/auth-services.service';
import { Router } from '@angular/router';
import { MensajeriaService } from '../../../services/mensajeria.service';

@Component({
  selector: 'app-login',
  imports: [GeneralModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //servicios
  private authService = inject(AuthServicesService)
  private fb = inject(FormBuilder)
  private mensajeriaService: MensajeriaService = inject(MensajeriaService)


  //variables publicas
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  cargando: boolean = false



  //variables privadas
  private router = new Router()



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
    this.cargando = true
    //validar campos
    if (!this.validarCampos()) {
      this.mensajeriaService.mostrarMensajeError('Por favor verifica los campos o las credenciales!');
      this.cargando = false
      return
    }

    const valores = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    try {
      
      const response = await lastValueFrom(this.authService.login(valores))
      console.log(response)
      if (response.tipo_usuario_id === 1) {
        this.router.navigate(['alumno']);
        this.cargando = false
      } else {
        this.router.navigate(['admin']);
        this.cargando = false
      }

    } catch (error: any) {
      this.mensajeriaService.mostrarMensajeError(error.error.message)

    } finally {
      this.cargando = false
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
