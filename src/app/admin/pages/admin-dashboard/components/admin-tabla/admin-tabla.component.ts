import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { UserService } from '../../../../../services/user.service';
import { User } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-tabla',
  imports: [GeneralModule],
  templateUrl: './admin-tabla.component.html',
  styleUrl: './admin-tabla.component.css'
})
export class AdminTablaComponent implements OnInit{
  //servicios
  private userService:UserService = inject(UserService)

  //variables publicas
  alumnos:User[] = []
  horasTotales:number = 0
  horasMes:number= 0

  async ngOnInit(){
    await this.traerAlumnosAyudantes()
  }

  //traer alumnos ayudantes
  private async traerAlumnosAyudantes(){
    try {
      const alumnos:User[] = await lastValueFrom(this.userService.traerAlumnos())
      this.alumnos = alumnos
    } catch (error:any) {
      console.log(error)
      
    }
  }
  

}
