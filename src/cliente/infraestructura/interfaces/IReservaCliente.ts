export interface IReservaCliente {
    _id:string,
    idCliente:string,
    idHabitacion:string,
    checkIn:Date,
    checkOut:Date,
    tipoReserva:string,
    estadoReserva:string,
    extras?:string[] | null,
}