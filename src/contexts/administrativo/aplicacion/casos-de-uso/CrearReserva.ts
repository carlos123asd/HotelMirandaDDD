import { Empleado } from "../../dominio/agregados/Empleado";
import { ReservaAdministrativa } from "../../dominio/agregados/ReservaAdministrativa";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { DTOReserva } from "../dtos/DTOReserva";
import { CalculadorPrecioReserva } from "../servicios-de-dominio/CalculadorPrecioReserva";

export class CrearReserva{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async ejecutar(responsable:Empleado,nuevoReservaDTO:DTOReserva,recargo:number):Promise<void>{
        if(!responsable.puedeDarAltaReserva()){
            throw new Error(`Empleado ${responsable.id} no tiene permisos para hacer reservas`);
        }
        const existeReserva = await this.reservaRepo.buscarPorID(nuevoReservaDTO.id)
        if(existeReserva){
            throw new Error("Ya existe un reserva con esta id")
        }
        const totalReserva = new CalculadorPrecioReserva(nuevoReservaDTO.habitacion.precio, nuevoReservaDTO.extras, recargo).calcular()
        const nuevaReserva = ReservaAdministrativa.crearDesdeDTO(nuevoReservaDTO, totalReserva)
        await this.reservaRepo.guardar(nuevaReserva)
    }
}