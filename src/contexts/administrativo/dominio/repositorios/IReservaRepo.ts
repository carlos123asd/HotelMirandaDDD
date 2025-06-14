import { ReservaAdministrativa } from "../agregados/ReservaAdministrativa";

export interface IReservaRepo {
    buscarPorID(id:String):Promise<ReservaAdministrativa|null>;
    buscarPorCliente(idCliente:string):Promise<ReservaAdministrativa[]|null>;
    buscarPorHabitacion(idHabitacion:string):Promise<ReservaAdministrativa[]|null>;
    guardar(reserva:ReservaAdministrativa):Promise<void>;
    eliminar(id:String):Promise<void>;
}