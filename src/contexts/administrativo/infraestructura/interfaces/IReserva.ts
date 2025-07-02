export interface IReserva {
    _id:string,
    estado:string,
    idCliente:string,
    idHabitacion:string,
    checkIn:Date,
    checkOut:Date,
    totalReserva:number,
    idEmpleado?:string | null,
    extras?:string[] | null,
    idNotasInternas?:string[] | null,
    peticion?:string | null
}