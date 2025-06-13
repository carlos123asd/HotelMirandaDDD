import { IReservaClienteRepo } from "../../../cliente/dominio/repositorios/IReservaClienteRepo";
import { DTOReservaCliente } from "../../../cliente/aplicacion/dtos/DTOReservaCliente";
import { Empleado } from "../../dominio/agregados/Empleado";

export class ModificarReservaCliente{
    constructor(
        private readonly reservaRepo:IReservaClienteRepo
    ){}

    async ejecutar(responsable:Empleado,dtoReserva:DTOReservaCliente):Promise<void>{
         if(!responsable.puedeModificarReserva()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar reservas`);
        }
        const reserva = await this.reservaRepo.buscarPorId(dtoReserva.id)
        if(!reserva){
            throw new Error("No se enconto ninguna reserva con este ID para modificar")
        }
        reserva.modificarDesdeDTO(dtoReserva)
        await this.reservaRepo.guardar(reserva)
    }
}