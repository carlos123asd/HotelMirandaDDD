import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { ReservaCliente } from "../../../cliente/dominio/agregados/ReservaCliente";
import { Empleado } from "../../dominio/agregados/Empleado";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { tiposNotasInternas } from "../../dominio/agregados/NotasInternas";
import { ReservaAdministrativa } from "../../dominio/agregados/ReservaAdministrativa";
import { DatoAgregado } from "../../dominio/value-objects/DatoAgregado";

export type DTONotasInternas = {
    id:string,
    responsable:Empleado,
    tipo:tiposNotasInternas,
    fecha:Date,
    titulo:string,
    descripcion:string,
    datosAgregados?:DatoAgregado[],
    cliente?:Cliente,
    reserva?:ReservaAdministrativa|ReservaCliente,
    habitacion?:Habitacion,
}