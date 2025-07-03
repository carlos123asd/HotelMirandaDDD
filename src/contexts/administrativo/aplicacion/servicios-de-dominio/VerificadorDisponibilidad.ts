import { Reserva } from "../../dominio/agregados/Reserva";

export class VerificadorDisponibilidad{
    static verificar(fechaInicio:Date,fechaFinal:Date,reservasActuales:[Reserva]):boolean{
        return !reservasActuales.some((reserva:Reserva) => (fechaInicio < reserva.checkOut && fechaFinal > reserva.checkIn))
    }
}