export interface IReservaAdministrativa {
    _id:string,
    estado:string,
    idCliente:string,
    idHabitacion:string,
    checkIn:Date,
    checkOut:Date,
    idEmpleado:string,
    tipoReserva:string,
    extras?:string[] | null,
    idNotasInternas?:string[] | null,
}