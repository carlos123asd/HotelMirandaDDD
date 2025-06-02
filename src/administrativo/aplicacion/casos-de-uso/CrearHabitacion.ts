import { Empleado } from "../../dominio/agregados/Empleado";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { DTOHabitacion } from "../dtos/DTOHabitacion";
import { GenerarCodigoHabitacion } from "../servicios-de-dominio/GenerarCodigoHabitacion";

export class CrearHabitacion{
    constructor(
        private readonly habitacionRepo:IHabitacionRepo
    ){}

    async ejecutar(responsable:Empleado,nuevaHabitacionDTO:DTOHabitacion):Promise<void>{
        if(!responsable.puedeDarAltaHabitacion()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para dar de alta a habitaciones`)
        }
        const codigo:String = await new GenerarCodigoHabitacion(this.habitacionRepo).generar(nuevaHabitacionDTO.piso)
        const nuevaHabitacion = Habitacion.crearDesdeDTO(nuevaHabitacionDTO,codigo)
        await this.habitacionRepo.guardar(nuevaHabitacion)
    }
}