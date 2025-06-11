export type estados = 'pendiente' | 'aceptada' | 'en curso' | 'cancelada'

export type ServiciosExtras = {
    nombre:string,
    precio:number
}

export interface IReservaAdministrativa {
    _id:String,
    estado:estados,
    idCliente:string,
    idHabitacion:string,
    checkIn:Date,
    checkOut:Date,
    idEmpleado:string,
    tipoReserva:string,
    extras?:string[],
    idNotasInternas?:string[],
}