import { Habitacion } from "../../../../contexts/administrativo/dominio/agregados/Habitacion";
import { estados, tipoReserva } from "../../../../contexts/administrativo/dominio/agregados/ReservaAdministrativa";
import { ServiciosExtras } from "../../../../contexts/administrativo/dominio/value-objects/ServiciosExtras";
import { Cliente } from "../../dominio/agregados/Cliente";

export type DTOReservaCliente = {
    id:string,
    asignacion:Cliente,
    habitacion:Habitacion,
    checkIn:Date,
    checkOut:Date,
    tipoReserva:tipoReserva,
    estadoReserva:estados,
    extras?:ServiciosExtras[] | null,
}