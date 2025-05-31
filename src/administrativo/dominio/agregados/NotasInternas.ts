import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { ReservaCliente } from "../../../cliente/dominio/agregados/ReservaCliente";
import { DatoAgregado } from "../value-objects/DatoAgregado";
import { Empleado } from "./Empleado";
import { Habitacion } from "./Habitacion";
import { ReservaAdministrativa } from "./ReservaAdministrativa";

export type tiposNotasInternas = 'Habitacion' | 'Cliente' | 'Reserva'

export class NotasInternas{
    constructor(
        public readonly id:string,
        public readonly responsable:Empleado,
        public readonly tipo:tiposNotasInternas,
        public readonly fecha:Date,
        public readonly titulo:string,
        public readonly descripcion:string,
        public readonly datosAgregados:DatoAgregado[],
        public readonly cliente?:Cliente,
        public readonly reserva?:ReservaAdministrativa|ReservaCliente,
        public readonly habitacion?:Habitacion,
    ){}
} 