import { Habitacion } from "../agregados/Habitacion";

export interface IHabitacionRepo {
    guardar(habitacion:Habitacion):Promise<void>;
    buscarPorId(id:String):Promise<Habitacion | null>;
    buscarPorCodigo(codigo:String):Promise<Habitacion | null>;
    todasLasHabitaciones():Promise<Habitacion[] | null>;
    eliminar(id:String):Promise<void>;
}