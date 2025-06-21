import { Empleado } from "../../dominio/agregados/Empleado";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { DTOReserva } from "../dtos/DTOReserva";

export class ModificarReserva{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async ejecutar(responsable:Empleado,dto:DTOReserva):Promise<void>{
        if(!responsable.puedeModificarReserva()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar reservas`);
        }
        const reserva = dto.id ? await this.reservaRepo.buscarPorID(dto.id) : null
        if(!reserva){
            throw new Error("Reserva no encontrada")
        }
        reserva.modificarDesdeDTO(dto)
        await this.reservaRepo.guardar(reserva,true)
    }
}