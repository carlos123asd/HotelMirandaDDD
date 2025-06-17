import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { DTOReserva } from "../../aplicacion/dtos/DTOReserva";
import { ServiciosExtras } from "../value-objects/ServiciosExtras";
import { Empleado } from "./Empleado";
import { Habitacion } from "./Habitacion";
import { NotasInternas } from "./NotasInternas";

export enum estados{ 
    pendiente = 'pendiente' , 
    aceptada = 'aceptada' , 
    'en curso' = 'en curso' , 
    cancelada = 'cancelada'}

export enum tipoReserva { 
    administracion = 'administracion' , 
    cliente = 'cliente' }
    
export class ReservaAdministrativa{
    constructor(
        public readonly id:String,
        public estado:estados,
        public asignacion:Cliente,
        public habitacion:Habitacion,
        public checkIn:Date,
        public checkOut:Date,
        public responsable:Empleado,
        public readonly tipoReserva:tipoReserva,
        public totalReserva:number,
        public extras?:ServiciosExtras[] | null,
        public notasInternas?:NotasInternas[] | null
    ){}

    static crearDesdePersistencia(params:{
        id:string,
        estado:string,
        asignacion:Cliente,
        habitacion:Habitacion,
        checkIn:Date,
        checkOut:Date,
        responsable:Empleado,
        tipoReserva:string,
        totalReserva:number,
        extras?:ServiciosExtras[] | null,
        notasInternas?:NotasInternas[] | null
    }):ReservaAdministrativa{
        if(!Object.values(estados).includes(params.estado as estados)){
            throw new Error("Estado de reserva invalida")
        }
        return new ReservaAdministrativa(
            params.id,
            params.estado as estados,
            params.asignacion,
            params.habitacion,
            params.checkIn,
            params.checkOut,
            params.responsable,
            params.tipoReserva as tipoReserva,
            params.totalReserva,
            params.extras,
            params.notasInternas
        )
    }

    static crearDesdeDTO(dto:DTOReserva, totalReserva:number){
        return new ReservaAdministrativa(
            dto.id,
            dto.estado,
            dto.asignacion,
            dto.habitacion,
            dto.checkIn,
            dto.checkOut,
            dto.responsable,
            dto.tipoReserva,
            totalReserva,
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
        this.totalReserva = dto.totalReserva ? dto.totalReserva : this.totalReserva;
    }
}