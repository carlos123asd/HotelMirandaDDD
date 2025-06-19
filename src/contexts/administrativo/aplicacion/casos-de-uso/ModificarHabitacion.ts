import { Empleado } from "../../dominio/agregados/Empleado";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { DTOHabitacion } from "../dtos/DTOHabitacion";

export class ModificarHabitacion{
    constructor(
        private readonly habitacionRepo:IHabitacionRepo
    ){}

    async ejecutar(responsable:Empleado,dto:DTOHabitacion, modificar:boolean):Promise<void>{
        if(!responsable.puedeModificarHabitacion()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar habitaciones`)
        }
        const habitacion = await this.habitacionRepo.buscarPorId(dto.id)
        if(!habitacion){
            throw new Error("Habitacion no encontrada")
        }
        habitacion.modificarDesdeDTO(dto)
        await this.habitacionRepo.guardar(habitacion, modificar)
    }
}