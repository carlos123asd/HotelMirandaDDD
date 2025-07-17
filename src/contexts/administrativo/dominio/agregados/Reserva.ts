import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { DTOReserva } from "../../aplicacion/dtos/DTOReserva";
import { Empleado } from "./Empleado";
import { Habitacion } from "./Habitacion";
import { NotasInternas } from "./NotasInternas";
import { Servicio } from "./Servicio";

export enum estados{ 
    pendiente = 'pendiente' , 
    aceptada = 'aceptada' , 
    'en curso' = 'en curso' , 
    cancelada = 'cancelada'}
    
export class Reserva{
    constructor(
        public readonly id:string | undefined,
        public estado:estados,
        public asignacion:Cliente,
        public habitacion:Habitacion,
        public checkIn:Date,
        public checkOut:Date,
        public totalReserva:number,
        public responsable?:Empleado | null,
        public extras?:Servicio[] | null,
        public notasInternas?:NotasInternas[] | null,
        public peticion?:string | null,
        public createdAt?:Date | null,
        public updatedAt?:Date | null,
    ){}

    static crearDesdePersistencia(params:{
        id:string,
        estado:string,
        asignacion:Cliente,
        habitacion:Habitacion,
        checkIn:Date,
        checkOut:Date,
        responsable:Empleado,
        totalReserva:number,
        extras?:Servicio[] | null,
        notasInternas?:NotasInternas[] | null,
        peticion?:string | null,
        createdAt?:Date | null,
        updatedAt?:Date | null
    }):Reserva{
        if(!Object.values(estados).includes(params.estado as estados)){
            throw new Error("Estado de reserva invalida")
        }
        return new Reserva(
            params.id,
            params.estado as estados,
            params.asignacion,
            params.habitacion,
            params.checkIn,
            params.checkOut,
            params.totalReserva,
            params.responsable,
            params.extras,
            params.notasInternas,
            params.peticion,
            params.createdAt,
            params.updatedAt
        )
    }

    static crearDesdeDTO(dto:DTOReserva, totalReserva:number){
        return new Reserva(
            dto.id,
            dto.estado,
            dto.asignacion,
            dto.habitacion,
            dto.checkIn,
            dto.checkOut,
            totalReserva,
            dto.responsable,
            dto.extras,
            dto.notasInternas,
            dto.peticion,
            dto.createdAt,
            dto.updatedAt
        )
    }
    modificarDesdeDTO(dto:DTOReserva){
        this.estado = dto.estado;
        this.asignacion = dto.asignacion;
        this.habitacion = dto.habitacion;
        this.checkIn = dto.checkIn;
        this.checkOut = dto.checkOut;
        this.responsable = dto.responsable;
        this.extras = dto.extras;
        this.notasInternas = dto.notasInternas;
        this.totalReserva = dto.totalReserva ? dto.totalReserva : this.totalReserva;
        this.peticion = dto.peticion ? dto.peticion : this.peticion;
    }
}