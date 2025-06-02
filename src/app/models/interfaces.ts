export interface LoginResponse {
    tipoUsuario: string
}

export interface User {
    id:number,
    nombre:string,
    apellido_paterno:string,
    apellido_materno:string,
    email:string,
    fono:number,
    tipo_usuario:string,
    run:string,
    password:string
}

export interface Actividad{
    id_actividad?:number,
    fecha_actividad:string,
    hora_inic_activdad:string,
    hora_term_actividad:string,
    area_trabajo:string,
    run_alumno:string
}