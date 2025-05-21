import { Component, inject, signal } from '@angular/core';
import { AuthServicesService } from '../../../services/auth-services.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralModule } from '../../modules/general/general.module';

@Component({
  selector: 'app-perfil',
  imports: [HeaderComponent, MatDividerModule, MatListModule, GeneralModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  private authService = inject(AuthServicesService)
  private userService = inject(UserService)
  private fb = inject(FormBuilder)
  private router = new Router()


  //TO DO
  perfilForm: FormGroup = this.fb.group({
    fono: ['', Validators.required],
    contrasenna1: ['', Validators.required],
    contrasenna2: ['', Validators.required],
  })

  nombre!: string
  email!: string
  fono!: number
  run!: string
  cargando: boolean = true
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async ngOnInit() {
    this.cargando = true
    await this.obtenerDatos()
    this.cargando = false
  }


  private async obtenerDatos() {
    try {
      const response = await lastValueFrom(this.authService.isAuthenticated())
      if (!response) {
        console.log('Error en la autenticacion')
        return
      }
      const response2 = await lastValueFrom(this.userService.findUserbyEmail())
      this.nombre = `${response2.nombre} ${response2.apellido_paterno} ${response2.apellido_materno}`
      this.email = response2.email
      this.fono = response2.fono
      this.run = response2.run

    } catch (error: any) {
      console.log(error)
    }
  }

  async actualizarDatos() {

    if (!this.userService.validarPerfilForm(this.perfilForm)) {
      return
    }
    const valores = {
      fono: parseInt(this.perfilForm.get('fono')?.value),
      password: this.perfilForm.get('contrasenna1')?.value
    }
    const response = await lastValueFrom(this.userService.actualizarDatos(valores))
    alert(response.message)
    try {
    } catch (error: any) {
      alert(error)
    }
  }

}
