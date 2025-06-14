export interface IReservaCliente {
    _id:string,
    idCliente:string,
    idHabitacion:string,
    checkIn:Date,
    checkOut:Date,
    tipoReserva:string,
    estado:string,
    extras?:string[],
}