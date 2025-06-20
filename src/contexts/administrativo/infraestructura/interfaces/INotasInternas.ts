export interface INotasInternas {
    _id:string,
    idResponsable:string,
    tipo:string,
    fecha:Date,
    titulo:string,
    descripcion:string,
    datosAgregados?:string[] | null,
    idCliente?:string | null,
    idReserva?:string | null
    idHabitacion?:string | null,
}