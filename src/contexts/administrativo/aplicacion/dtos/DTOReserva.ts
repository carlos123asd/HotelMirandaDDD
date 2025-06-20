import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { Empleado } from "../../dominio/agregados/Empleado";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { estados } from "../../dominio/agregados/Reserva";
import { ServiciosExtras } from "../../dominio/value-objects/ServiciosExtras";

export type DTOReserva = {
    id:string,
    estado:estados,
    asignacion:Cliente,
    habitacion:Habitacion,
    checkIn:Date,
    checkOut:Date,
    responsable?:Empleado | null,
    totalReserva?:number | null,
    extras?:ServiciosExtras[] | null,
    notasInternas?:NotasInternas[] | null,
}