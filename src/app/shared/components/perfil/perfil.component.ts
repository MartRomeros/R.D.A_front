import { Component, inject } from '@angular/core';
import { AuthServicesService } from '../../../services/auth-services.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [MatCardModule, HeaderComponent, MatDividerModule, MatListModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
    fono:[''],
    contrasenna1: [''],
    contrasenna2: [''],
  })

  nombre!: string
  email!: string
  fono!: number
  run!: string

  ngOnInit() {
    this.obtenerDatos()
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

}
