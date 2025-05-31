import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { ServiciosExtras } from "../value-objects/ServiciosExtras";
import { Habitacion } from "./Habitacion";
import { NotasInternas } from "./NotasInternas";

export type estados = 'pendiente' | 'aceptada' | 'en curso' | 'cancelada'
export class Reserva{
    constructor(
        public readonly id:string,
        public readonly estado:estados,
        public readonly notasInternas:NotasInternas[],
        public readonly asignacion:Cliente,
        public readonly habitacion:Habitacion,
        public readonly checkIn:Date,
        public readonly checkOut:Date,
        public readonly extras:ServiciosExtras[]
    ){}
}