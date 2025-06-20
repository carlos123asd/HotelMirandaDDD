export interface IReserva {
    _id:string,
    estado:string,
    idCliente:string,
    idHabitacion:string,
    checkIn:Date,
    checkOut:Date,
    idEmpleado:string,
    tipoReserva:string,
    totalReserva:number,
    extras?:string[] | null,
    idNotasInternas?:string[] | null,
}