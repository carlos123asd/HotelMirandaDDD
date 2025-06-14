import { Empleado } from "../../dominio/agregados/Empleado";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { DTOEmpleado } from "../dtos/DTOEmpleado";

export class EliminarEmpleado{
    constructor(
        private readonly empleadoRepo:IEmpleadoRepo
    ){}

    async ejecutar(responsable:Empleado,dto:DTOEmpleado):Promise<void>{
        if(!responsable.puedeEliminarEmpleado()){
           throw new Error(`Empleado ${responsable.id} no tiene permisos para eliminar otros empleados`);
        }
        const empleadoExiste = await this.empleadoRepo.buscarPorId(dto.id)
        if(!empleadoExiste){
            throw new Error("Empleado no encontrado");
        }
        await this.empleadoRepo.eliminar(dto.id)
    }
}