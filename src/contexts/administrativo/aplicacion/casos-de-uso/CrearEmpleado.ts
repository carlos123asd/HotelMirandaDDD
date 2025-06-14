import { Empleado } from "../../dominio/agregados/Empleado";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { DTOEmpleado } from "../dtos/DTOEmpleado";

export class CrearEmpleado{
    constructor(
        private readonly empleadoRepo: IEmpleadoRepo
    ){}

    async ejecutar(responsable:Empleado, nuevoEmpleadoDTO:DTOEmpleado):Promise<void>{
        if(!responsable.puedeDarAltaEmpleado()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para dar de alta a otros empleados`);
        }
        
        const nuevoEmpleado = Empleado.crearDesdeDTO(nuevoEmpleadoDTO);
        const existeEmpleado = await this.empleadoRepo.buscarPorEmail(nuevoEmpleado.email);

        if(existeEmpleado){ 
            throw new Error("Ya existe un empleado con este correo electronico")
        }
        await this.empleadoRepo.guardar(nuevoEmpleado)
    }
}