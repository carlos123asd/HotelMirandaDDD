import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { Empleado } from "../../dominio/agregados/Empleado";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { estados } from "../../dominio/agregados/Reserva";
import { Servicio } from "../../dominio/agregados/Servicio";

export type DTOReserva = {
    id?:string,
    estado:estados,
    asignacion:Cliente,
    habitacion:Habitacion,
    checkIn:Date,
    checkOut:Date,
    responsable?:Empleado | null,
    totalReserva?:number | null,
    extras?:Servicio[] | null,
    notasInternas?:NotasInternas[] | null,
    peticion?:string | null,
    createdAt?:Date | null,
    updatedAt?:Date | null
}