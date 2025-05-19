import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
//import { AlumnoComponent } from './components/alumno/alumno.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { PerfilComponent } from './shared/components/perfil/perfil.component';
import { AlumnoDashboardComponent } from './alumno/pages/alumno-dashboard/alumno-dashboard.component';



export const routes: Routes = [
    {
        path: 'alumno',
        component: AlumnoDashboardComponent
    },
    { path: '', component: LoginComponent },

    //ruta login component
    { path: 'login', component: LoginComponent },
    //{path:'alumno',component:AlumnoComponent},
    { path: 'admin', component: AdminComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'perfil', component: PerfilComponent },

    { path: 'forgot-password', component: ForgotPasswordComponent },

    { path: '**', component: LoginComponent },

];
