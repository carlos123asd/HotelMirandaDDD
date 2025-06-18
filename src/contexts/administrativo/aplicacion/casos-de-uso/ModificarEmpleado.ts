import { Empleado } from "../../dominio/agregados/Empleado";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { DTOEmpleado } from "../dtos/DTOEmpleado";

export class ModificarEmpleado{
    constructor(
        private readonly empleadoRepo:IEmpleadoRepo
    ){}

    async ejecutar(responsable:Empleado, dto:DTOEmpleado, modificar=false):Promise<void>{
        if(!responsable.puedeModificarEmpleado()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar otros empleados`);
        }
        const empleadoExistente = await this.empleadoRepo.buscarPorId(dto.id);
        if(!empleadoExistente){
            throw new Error("Empleado no encontrado")
        }
       empleadoExistente.modificarDesdeDTO(dto)
       await this.empleadoRepo.guardar(empleadoExistente,modificar)
    }
}