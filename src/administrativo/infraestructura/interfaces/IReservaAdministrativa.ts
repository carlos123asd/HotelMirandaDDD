import { ICliente } from "../../../cliente/infraestructura/interfaces/ICliente";
import IEmpleado from "./IEmpleado";
import IHabitacion from "./IHabitacion";
import { INotasInternas } from "./INotasInternas";

export type estados = 'pendiente' | 'aceptada' | 'en curso' | 'cancelada'

export type ServiciosExtras = {
    nombre:string,
    precio:number
}

export interface IReservaAdministrativa {
    _id:String,
    estado:estados,
    asignacion:ICliente,
    habitacion:IHabitacion,
    checkIn:Date,
    checkOut:Date,
    responsable:IEmpleado,
    extras?:ServiciosExtras[],
    notasInternas?:INotasInternas[],
}