import { Habitacion } from "../../../administrativo/dominio/agregados/Habitacion";
import { ServiciosExtras } from "../../../administrativo/dominio/value-objects/ServiciosExtras";
import { DTOReservaCliente } from "../../aplicacion/dtos/DTOReservaCliente";
import { Cliente } from "./Cliente";

export class ReservaCliente{
    constructor(
            public readonly id:string,
            public asignacion:Cliente,
            public habitacion:Habitacion,
            public checkIn:Date,
            public checkOut:Date,
            public extras?:ServiciosExtras[],
    ){}
    
    static crearDesdeDTO(dto:DTOReservaCliente):ReservaCliente{
        return new ReservaCliente(
            dto.id,
            dto.asignacion,
            dto.habitacion,
            dto.checkIn,
            dto.checkOut,
            dto.extras
        )
    }

    modificarDesdeDTO(dto:DTOReservaCliente){
        if(this.id !== dto.id){
            throw new Error("ID del cliente no se puede modificar")
        }
        this.asignacion=dto.asignacion,
        this.habitacion=dto.habitacion,
        this.checkIn=dto.checkIn,
        this.checkOut=dto.checkOut,
        this.extras=dto.extras
    }
}