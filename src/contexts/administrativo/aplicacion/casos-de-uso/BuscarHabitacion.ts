import { Habitacion } from "../../dominio/agregados/Habitacion";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { FiltroHabitacionesDTO } from "../dtos/DTOFiltroHabitaciones";

export class BuscarHabitacion{
    constructor(
        private readonly habitacionRepo:IHabitacionRepo
    ){}

    async buscarPorID(idHabitacion:string):Promise<Habitacion>{
        const habitacion = await this.habitacionRepo.buscarPorId(idHabitacion)
        if(!habitacion){
            throw new Error("No se encontro ninguna habitacion con este ID")
        }
        return habitacion
    }

    async buscarPorCodigo(codigo:string):Promise<Habitacion>{
        const habitacion = await this.habitacionRepo.buscarPorCodigo(codigo)
        if(!habitacion){
            throw new Error("No se encontro ninguna habitacion con este Codigo")
        }
        return habitacion
    }

    async buscarPorFiltro(filtros:FiltroHabitacionesDTO):Promise<Habitacion[]>{
        const habitaciones = await this.habitacionRepo.buscarConFiltros(filtros)
        if(!habitaciones){
            throw new Error("Habitaciones sin ninguna coincidencia")
        }
        return habitaciones
    }

    async buscarTodasLasHabitaciones():Promise<Habitacion[]>{
        const habitaciones = await this.habitacionRepo.todasLasHabitaciones()
        if(!habitaciones){
            throw new Error("No hay habitaciones que mostrar")
        }
        return habitaciones
    }
}