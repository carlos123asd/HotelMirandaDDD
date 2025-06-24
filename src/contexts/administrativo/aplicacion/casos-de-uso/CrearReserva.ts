import { Reserva } from "../../dominio/agregados/Reserva";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { DTOReserva } from "../dtos/DTOReserva";
import { CalculadorPrecioReserva } from "../servicios-de-dominio/CalculadorPrecioReserva";

export class CrearReserva{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async ejecutar(nuevoReservaDTO:DTOReserva,recargo:number):Promise<void>{
        const existeReserva = nuevoReservaDTO.id ? 
        await this.reservaRepo.buscarPorID(nuevoReservaDTO.id) : null
        if(existeReserva){
            throw new Error("Ya existe un reserva con esta id")
        }
        const totalReserva = new CalculadorPrecioReserva(nuevoReservaDTO.habitacion.precio, nuevoReservaDTO.extras, recargo, nuevoReservaDTO.habitacion.oferta).calcular()
        const nuevaReserva = Reserva.crearDesdeDTO(nuevoReservaDTO, totalReserva)
        await this.reservaRepo.guardar(nuevaReserva,false)
    }
}