import { ReservaCliente } from "../../../cliente/dominio/agregados/ReservaCliente";
import { ReservaAdministrativa } from "../../dominio/agregados/Reserva";

export class VerificadorDisponibilidad{
    static verificar(fechaInicio:Date,fechaFinal:Date,reservasActuales:[ReservaAdministrativa|ReservaCliente]):boolean{
        return !reservasActuales.some((reserva:ReservaAdministrativa|ReservaCliente) => (fechaInicio < reserva.checkOut && fechaFinal > reserva.checkIn))
    }
}