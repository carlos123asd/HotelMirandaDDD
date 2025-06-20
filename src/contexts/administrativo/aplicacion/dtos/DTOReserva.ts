import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { Empleado } from "../../dominio/agregados/Empleado";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { estados, tipoReserva } from "../../dominio/agregados/Reserva";
import { ServiciosExtras } from "../../dominio/value-objects/ServiciosExtras";

export type DTOReserva = {
    id:String,
    estado:estados,
    asignacion:Cliente,
    habitacion:Habitacion,
    checkIn:Date,
    checkOut:Date,
    responsable:Empleado,
    tipoReserva:tipoReserva,
    totalReserva?:number | null,
    extras?:ServiciosExtras[] | null,
    notasInternas?:NotasInternas[] | null,
}