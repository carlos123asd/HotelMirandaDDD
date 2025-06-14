import { Empleado } from "../../dominio/agregados/Empleado";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";

export class BuscarEmpleado{
    constructor(
        private readonly empleadoRepo: IEmpleadoRepo
    ){}

    async buscarPorId(idEmpleado:string):Promise<Empleado>{
        const empleado = await this.empleadoRepo.buscarPorId(idEmpleado)     
        if(!empleado){
            throw new Error("No se enconto empleado con este ID")
        }  
        return empleado
    }

    async buscarPorEmail(email:string):Promise<Empleado>{
        const empleado = await this.empleadoRepo.buscarPorEmail(email)
        if(!empleado){
            throw new Error("No se encontro ningún empleado con este correo")
        }
        return empleado
    }

    async buscarPorCodigo(codigo:string):Promise<Empleado>{
        const empleado = await this.empleadoRepo.buscarPorCodigo(codigo)
        if(!empleado){
            throw new Error("No se encontro ningún empleado con este Codigo")
        }
        return empleado 
    }
}