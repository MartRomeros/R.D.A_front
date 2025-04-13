import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    
    //ruta login component
    {path:'login',component:LoginComponent},
    //ruta registro componente
    {path:'registro',component:RegistroComponent},

    {path:'**',component:LoginComponent},

];
