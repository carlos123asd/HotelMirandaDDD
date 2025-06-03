import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { DTOReserva } from "../../aplicacion/dtos/DTOReserva";
import { ServiciosExtras } from "../value-objects/ServiciosExtras";
import { Empleado } from "./Empleado";
import { Habitacion } from "./Habitacion";
import { NotasInternas } from "./NotasInternas";

export type estados = 'pendiente' | 'aceptada' | 'en curso' | 'cancelada'
export class ReservaAdministrativa{
    constructor(
        public readonly id:String,
        public estado:estados,
        public asignacion:Cliente,
        public habitacion:Habitacion,
        public checkIn:Date,
        public checkOut:Date,
        public responsable:Empleado,
        public extras?:ServiciosExtras[],
        public notasInternas?:NotasInternas[],
    ){}

    static crearDesdeDTO(dto:DTOReserva){
        return new ReservaAdministrativa(
            dto.id,
            dto.estado,
            dto.asignacion,
            dto.habitacion,
            dto.checkIn,
            dto.checkOut,
            dto.responsable,
            dto.extras,
            dto.notasInternas,
        )
    }
    modificarDesdeDTO(dto:DTOReserva){
        if(dto.id !== this.id){
             throw new Error("El id de una Reserva no se pueden modificar")
        }
        this.estado = dto.estado;
        this.asignacion = dto.asignacion;
        this.habitacion = dto.habitacion;
        this.checkIn = dto.checkIn;
        this.checkOut = dto.checkOut;
        this.responsable = dto.responsable;
        this.extras = dto.extras;
        this.notasInternas = dto.notasInternas;
    }
}