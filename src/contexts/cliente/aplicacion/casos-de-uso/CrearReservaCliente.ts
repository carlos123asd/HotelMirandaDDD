import { DTOReserva } from "../../../administrativo/aplicacion/dtos/DTOReserva";
import { CalculadorPrecioReserva } from "../../../administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva";
import { Reserva } from "../../../administrativo/dominio/agregados/Reserva";
import { IReservaRepo } from "../../../administrativo/dominio/repositorios/IReservaRepo";

export class CrearReservaCliente{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async ejecutar(dtoReserva:DTOReserva, recargo:number):Promise<void>{
        const reservaEncontrada = await this.reservaRepo.buscarPorID(dtoReserva.id)
        if(reservaEncontrada){
            throw new Error("Ya existe una reserva con este ID")
        }
        const totalReserva = new CalculadorPrecioReserva(dtoReserva.habitacion.precio, dtoReserva.extras, recargo, dtoReserva.habitacion.oferta).calcular()
        const nuevaReserva = Reserva.crearDesdeDTO(dtoReserva, totalReserva)
        await this.reservaRepo.guardar(nuevaReserva,false)
    }
}