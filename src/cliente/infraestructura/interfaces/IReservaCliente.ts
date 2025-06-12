import { ServiciosExtras } from "../../../administrativo/infraestructura/interfaces/IReservaAdministrativa";

export interface IReservaCliente {
    id:string,
    idCliente:string,
    idHabitacion:string,
    checkIn:Date,
    checkOut:Date,
    tipoReserva:string,
    estado:string,
    extras?:string[],
}