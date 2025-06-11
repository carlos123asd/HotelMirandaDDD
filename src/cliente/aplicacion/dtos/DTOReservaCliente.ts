import { Habitacion } from "../../../administrativo/dominio/agregados/Habitacion";
import { tipoReserva } from "../../../administrativo/dominio/agregados/ReservaAdministrativa";
import { ServiciosExtras } from "../../../administrativo/dominio/value-objects/ServiciosExtras";
import { Cliente } from "../../dominio/agregados/Cliente";

export type DTOReservaCliente = {
    id:string,
    asignacion:Cliente,
    habitacion:Habitacion,
    checkIn:Date,
    checkOut:Date,
    tipoReserva:tipoReserva,
    extras?:ServiciosExtras[],
}