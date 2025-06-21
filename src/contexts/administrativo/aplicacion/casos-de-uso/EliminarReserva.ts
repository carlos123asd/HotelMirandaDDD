import { Empleado } from "../../dominio/agregados/Empleado";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { DTOReserva } from "../dtos/DTOReserva";

export class EliminarReserva{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async ejecutar(responsable:Empleado,dto:DTOReserva):Promise<void>{
        if(!responsable.puedeEliminarReserva()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para eliminar reservas`);
        }
        const existeReserva = dto.id ? await this.reservaRepo.buscarPorID(dto.id) : null
        if(!existeReserva){
             throw new Error("Reserva no encontrada");
        }
        await this.reservaRepo.eliminar(String(existeReserva.id))
    }
}