import { Empleado } from "../../dominio/agregados/Empleado";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { DTOHabitacion } from "../dtos/DTOHabitacion";

export class EliminarHabitacion{
    constructor(
        private readonly habitacionRepo:IHabitacionRepo
    ){}

    async ejecutar(responsable:Empleado,dto:DTOHabitacion):Promise<void>{
        if(!responsable.puedeEliminarHabitacion()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para eliminar habitaciones`);
        }
        const existeHabitacion = await this.habitacionRepo.buscarPorId(dto.id)
        if(!existeHabitacion){
            throw new Error("Habitacion no encontrada");
        }
        await this.habitacionRepo.eliminar(dto.id)
    }
}