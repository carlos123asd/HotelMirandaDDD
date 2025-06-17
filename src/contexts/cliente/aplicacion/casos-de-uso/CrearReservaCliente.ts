import { CalculadorPrecioReserva } from "../../../administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva";
import { ReservaCliente } from "../../dominio/agregados/ReservaCliente";
import { IReservaClienteRepo } from "../../dominio/repositorios/IReservaClienteRepo";
import { DTOReservaCliente } from "../dtos/DTOReservaCliente";

export class CrearReservaCliente{
    constructor(
        private readonly reservaRepo:IReservaClienteRepo
    ){}

    async ejecutar(dtoReserva:DTOReservaCliente, recargo:number):Promise<void>{
        const reservaEncontrada = await this.reservaRepo.buscarPorId(dtoReserva.id)
        if(reservaEncontrada){
            throw new Error("Ya existe una reserva con este ID")
        }
        const totalReserva = new CalculadorPrecioReserva(dtoReserva.habitacion.precio, dtoReserva.extras, recargo, dtoReserva.habitacion.oferta).calcular()
        const nuevaReserva = ReservaCliente.crearDesdeDTO(dtoReserva, totalReserva)
        await this.reservaRepo.guardar(nuevaReserva)
    }
}