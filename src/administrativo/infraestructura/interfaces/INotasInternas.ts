import { IReservaCliente } from "../../../cliente/infraestructura/interfaces/IReservaCliente";
import { ICliente } from "../../../cliente/infraestructura/interfaces/ICliente";
import IEmpleado from "./IEmpleado";
import IHabitacion from "./IHabitacion";
import { IReservaAdministrativa } from "./IReservaAdministrativa";

export type tiposNotasInternas = 'Habitacion' | 'Cliente' | 'Reserva'

export interface INotasInternas {
    _id:string,
    responsable:IEmpleado,
    tipo:tiposNotasInternas,
    fecha:Date,
    titulo:string,
    descripcion:string,
    datosAgregados?:string[],
    cliente?:ICliente,
    reservaCliente?:IReservaAdministrativa,
    reservaAdministrativa?:IReservaCliente
    habitacion?:IHabitacion,
}