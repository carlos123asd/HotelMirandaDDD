import { FiltroHabitacionesDTO } from "../../aplicacion/dtos/DTOFiltroHabitaciones";
import { Habitacion } from "../agregados/Habitacion";

export interface IHabitacionRepo {
    guardar(habitacion:Habitacion,modificar:boolean):Promise<void>;
    buscarPorId(id:String):Promise<Habitacion | null>;
    buscarPorCodigo(codigo:String):Promise<Habitacion | null>;
    todasLasHabitaciones():Promise<Habitacion[] | null>;
    ContarHabitaciones():Promise<number>;
    buscarConFiltros(filtros:FiltroHabitacionesDTO):Promise<Habitacion[] | null>;
    eliminar(id:String):Promise<void>;
}