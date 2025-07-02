import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { Empleado } from "../../dominio/agregados/Empleado";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { tiposNotasInternas } from "../../dominio/agregados/NotasInternas";
import { Reserva } from "../../dominio/agregados/Reserva";

export type DTONotasInternas = {
    id:string,
    responsable:Empleado,
    tipo:tiposNotasInternas,
    fecha:Date,
    titulo:string,
    descripcion:string,
    datosAgregados?:string[] | null,
    cliente?:Cliente | null,
    reserva?:Reserva | null,
    habitacion?:Habitacion | null,
}