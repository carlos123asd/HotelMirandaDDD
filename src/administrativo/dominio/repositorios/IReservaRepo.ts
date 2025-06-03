import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { ReservaAdministrativa } from "../agregados/ReservaAdministrativa";

export interface IReservaRepo {
    buscarPorID(id:String):Promise<ReservaAdministrativa|null>;
    buscarPorCliente(cliente:Cliente):Promise<ReservaAdministrativa|null>;
    guardar(reserva:ReservaAdministrativa):Promise<void>;
    eliminar(id:String):Promise<void>;
}