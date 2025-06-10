import { ReservaCliente } from "../../../cliente/dominio/agregados/ReservaCliente";
import { NotasInternas } from "../agregados/NotasInternas";

export interface INotasInternasRepo {
    guardar(notaInterna:NotasInternas):Promise<void>;
    eliminar(id:string):Promise<void>;
    buscarId(id:string):Promise<NotasInternas | null>;
    buscarPorHabitacion(idHabitacion:string):Promise<NotasInternas | null>;
    buscarPorCliente(idCliente:string):Promise<NotasInternas | null>;
    buscarPorReserva(idReserva:string|ReservaCliente):Promise<NotasInternas | null>;
}