export interface ResumenMes {
    montoFormateado: string,
    horasMes: number
}

export interface Area_Trabajo {
    id: number,
    nombre: string
}

export interface Actividad {
    id_actividad: number,
    fecha_actividad: string,
    hora_inic_activdad: string,
    hora_term_actividad: string,
    estado: boolean,
    area_trabajo_id: number,
    run_alumno: string,
    area_trabajo: Area_Trabajo
}

export interface HorasAreasMes {
    difusion: number,
    comunicacion: number,
    extension: number,
    desarrollo_laboral: number
}