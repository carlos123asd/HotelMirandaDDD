import { ReservaAdministrativa } from "../agregados/Reserva";

export interface IReservaRepo {
    buscarPorID(id:String):Promise<ReservaAdministrativa|null>;
    buscarPorCliente(idCliente:string):Promise<ReservaAdministrativa[]|null>;
    buscarPorHabitacion(idHabitacion:string):Promise<ReservaAdministrativa[]|null>;
    guardar(reserva:ReservaAdministrativa,modificar:boolean):Promise<void>;
    eliminar(id:String):Promise<void>;
}