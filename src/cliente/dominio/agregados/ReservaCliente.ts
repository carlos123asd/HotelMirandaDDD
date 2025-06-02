import { Habitacion } from "../../../administrativo/dominio/agregados/Habitacion";
import { ServiciosExtras } from "../../../administrativo/dominio/value-objects/ServiciosExtras";
import { Cliente } from "./Cliente";

export class ReservaCliente{
    constructor(
            public readonly id:string,
            public readonly asignacion:Cliente,
            public readonly habitacion:Habitacion,
            public readonly checkIn:Date,
            public readonly checkOut:Date,
            public readonly extras?:ServiciosExtras[],
        ){}
    
}