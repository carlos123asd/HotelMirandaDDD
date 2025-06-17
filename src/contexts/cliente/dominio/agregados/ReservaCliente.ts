import { Habitacion } from "../../../../contexts/administrativo/dominio/agregados/Habitacion";
import { estados, tipoReserva } from "../../../../contexts/administrativo/dominio/agregados/ReservaAdministrativa";
import { ServiciosExtras } from "../../../../contexts/administrativo/dominio/value-objects/ServiciosExtras";
import { DTOReservaCliente } from "../../aplicacion/dtos/DTOReservaCliente";
import { Cliente } from "./Cliente";

export class ReservaCliente{
    constructor(
            public readonly id:string,
            public asignacion:Cliente,
            public habitacion:Habitacion,
            public checkIn:Date,
            public checkOut:Date,
            public readonly tipoReserva:tipoReserva,
            public estadoReserva:estados,
            public totalReserva:number,
            public extras?:ServiciosExtras[] | null,
    ){}

    static crearDesdePersistencia(params:{
        id:string,
        asignacion:Cliente,
        habitacion:Habitacion,
        checkIn:Date,
        checkOut:Date,
        tipoReserva:string,
        estadoReserva:string,
        totalReserva:number,
        extras?:ServiciosExtras[] | null,
    }){
        if(!Object.values(tipoReserva).includes(params.tipoReserva as tipoReserva)
            || !Object.values(estados).includes(params.estadoReserva as estados)
        ){
            throw new Error("Tipo de Reserva o Estado de la reserva invalidos")
        }
        return new ReservaCliente(
            params.id,
            params.asignacion,
            params.habitacion,
            params.checkIn,
            params.checkOut,
            params.tipoReserva as tipoReserva,
            params.estadoReserva as estados,
            params.totalReserva,
            params.extras,
        )
    }
    
    static crearDesdeDTO(dto:DTOReservaCliente,totalReserva:number):ReservaCliente{
        return new ReservaCliente(
            dto.id,
            dto.asignacion,
            dto.habitacion,
            dto.checkIn,
            dto.checkOut,
            dto.tipoReserva,
            dto.estadoReserva,
            totalReserva,
            dto.extras
        )
    }

    modificarDesdeDTO(dto:DTOReservaCliente){
        if(this.id !== dto.id){
            throw new Error("ID del cliente no se puede modificar")
        }
        this.asignacion=dto.asignacion
        this.habitacion=dto.habitacion
        this.checkIn=dto.checkIn
        this.checkOut=dto.checkOut
        this.estadoReserva=dto.estadoReserva
        this.totalReserva=dto.totalReserva ? dto.totalReserva : this.totalReserva
        this.extras=dto.extras
    }
}