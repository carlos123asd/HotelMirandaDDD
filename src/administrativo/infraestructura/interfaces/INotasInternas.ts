import IEmpleado from "./IEmpleado";

export type tiposNotasInternas = 'Habitacion' | 'Cliente' | 'Reserva'
export type tiposReservas = 'cliente' | 'administrativa'

export interface INotasInternas {
    _id:string,
    tipoReserva:tiposReservas,
    idResponsable:string,
    tipo:tiposNotasInternas,
    fecha:Date,
    titulo:string,
    descripcion:string,
    datosAgregados?:string[],
    idCliente?:string,
    idReserva?:string
    idHabitacion?:string,
}