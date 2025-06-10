import { Habitacion } from "../agregados/Habitacion";

export interface IHabitacionRepo {
    guardar(habitacion:Habitacion):Promise<void>;
    buscarPorId(id:String):Promise<Habitacion | null>;
    buscarPorCodigo(codigo:String):Promise<Habitacion | null>;
    todasLasHabitaciones(desde:number):Promise<Habitacion[] | null>;
    eliminar(id:String):Promise<void>;
}