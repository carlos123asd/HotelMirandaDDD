
import { Empleado } from "../../dominio/agregados/Empleado";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { DTOReserva } from "../dtos/DTOReserva";

export class ModificarReservaCliente{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async ejecutar(responsable:Empleado,dtoReserva:DTOReserva):Promise<void>{
         if(!responsable.puedeModificarReserva()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar reservas`);
        }
        if (!dtoReserva.id) {
            throw new Error("El ID de la reserva es requerido para modificarla");
        }
        const reserva = await this.reservaRepo.buscarPorID(dtoReserva.id)
        if(!reserva){
            throw new Error("No se enconto ninguna reserva con este ID para modificar")
        }
        reserva.modificarDesdeDTO(dtoReserva)
        await this.reservaRepo.guardar(reserva,true)
    }
}