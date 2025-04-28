import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { AlumnoComponent } from './components/alumno/alumno.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    
    //ruta login component
    {path:'login',component:LoginComponent},
    {path:'alumno',component:AlumnoComponent},
    //ruta registro componente
    {path:'registro',component:RegistroComponent},

    {path:'forgot-password',component:ForgotPasswordComponent},

    {path:'**',component:LoginComponent},

];
