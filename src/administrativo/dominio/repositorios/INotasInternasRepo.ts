import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { ReservaCliente } from "../../../cliente/dominio/agregados/ReservaCliente";
import { Habitacion } from "../agregados/Habitacion";
import { NotasInternas } from "../agregados/NotasInternas";
import { ReservaAdministrativa } from "../agregados/ReservaAdministrativa";

export interface INotasInternasRepo {
    guardar(notaInterna:NotasInternas):Promise<void>;
    eliminar(id:string):Promise<void>;
    buscarId(id:string):Promise<NotasInternas | null>;
    buscarPorHabitacion(habitacion:Habitacion):Promise<NotasInternas | null>;
    buscarPorCliente(cliente:Cliente):Promise<NotasInternas | null>;
    buscarPorReserva(reserva:ReservaAdministrativa|ReservaCliente):Promise<NotasInternas | null>;
}