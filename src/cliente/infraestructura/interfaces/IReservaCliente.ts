import IHabitacion from "../../../administrativo/infraestructura/interfaces/IHabitacion";
import { ServiciosExtras } from "../../../administrativo/infraestructura/interfaces/IReservaAdministrativa";
import { ICliente } from "./ICliente";

export interface IReservaCliente {
    id:string,
    asignacion:ICliente,
    habitacion:IHabitacion,
    checkIn:Date,
    checkOut:Date,
    tipoReserva:string,
    extras?:ServiciosExtras[],
}