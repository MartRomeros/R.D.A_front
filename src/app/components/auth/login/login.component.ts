import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  step = 1;

  nombre = '';
  apellido = '';
  fechaNacimiento = '';
  contrasena = '';

  irAlSiguientePaso() {
    this.step++;
  }
}
