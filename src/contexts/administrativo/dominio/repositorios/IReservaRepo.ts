import { Reserva } from "../agregados/Reserva";

export interface IReservaRepo {
    buscarPorID(id:String):Promise<Reserva|null>;
    buscarPorCliente(idCliente:string):Promise<Reserva[]|null>;
    buscarPorHabitacion(idHabitacion:string):Promise<Reserva[]|null>;
    guardar(reserva:Reserva,modificar:boolean):Promise<void>;
    buscarTodasReservas():Promise<Reserva[] | null>;
    eliminar(id:String):Promise<void>;
}