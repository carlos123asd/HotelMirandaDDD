import { ReservaAdministrativa } from "../../../administrativo/dominio/agregados/ReservaAdministrativa";
import { IReservaRepo } from "../../../../contexts/administrativo/dominio/repositorios/IReservaRepo";
import { ReservaCliente } from "../../dominio/agregados/ReservaCliente";
import { IReservaClienteRepo } from "../../dominio/repositorios/IReservaClienteRepo";
import { DTOCliente } from "../dtos/DTOCliente";
import { DTOReservaCliente } from "../dtos/DTOReservaCliente";

export class VerReserva{
    constructor(
        private readonly reservaClienteRepo:IReservaClienteRepo,
        private readonly reservaAdministativaRepo:IReservaRepo
    ){}

    async buscarPorID(reservaDTO:DTOReservaCliente):Promise<ReservaCliente>{
        const reserva = await this.reservaClienteRepo.buscarPorId(reservaDTO.id)
        if(!reserva){
            throw new Error("No se encontro ninguna reserva con este ID")
        }
        return reserva
    }

    async buscarReservas(clienteDTO:DTOCliente):Promise<(ReservaCliente|ReservaAdministrativa)[]>{
        const reservasCliente = await this.reservaClienteRepo.buscarPorCliente(clienteDTO.id)
        const reservasAdministrativa = await this.reservaAdministativaRepo.buscarPorCliente(clienteDTO.id)
        if(!reservasCliente && !reservasAdministrativa){
            throw new Error("No se encontraron reservas para este Cliente")
        }
        const result = [
            ...(reservasCliente || []),
            ...(reservasAdministrativa || [])
        ];
        
        return result
    }
}