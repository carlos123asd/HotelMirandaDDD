import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { DTONotasInternas } from "../../aplicacion/dtos/DTONotasInternas";
import { Empleado } from "./Empleado";
import { Habitacion } from "./Habitacion";
import { Reserva } from "./Reserva";

export enum tiposNotasInternas { 
    Habitacion = 'Habitacion' , 
    Cliente = 'Cliente' , 
    Reserva = 'Reserva' }

export class NotasInternas{
    constructor(
        public readonly id:string,
        public responsable:Empleado,
        public tipo:tiposNotasInternas,
        public fecha:Date,
        public titulo:string,
        public descripcion:string,
        public datosAgregados?:string[] | null,
        public cliente?:Cliente | null,
        public reserva?:Reserva | null,
        public habitacion?:Habitacion | null,
    ){}

    static crearDesdePersistencia(params:{
        id:string,
        responsable:Empleado,
        tipo:string,
        fecha:Date,
        titulo:string,
        descripcion:string,
        datosAgregados?:string[] | null,
        cliente?:Cliente | null,
        reserva?:Reserva | null,
        habitacion?:Habitacion | null,
    }):NotasInternas{
        if(!Object.values(tiposNotasInternas).includes(params.tipo as tiposNotasInternas)){
            throw new Error("Tipo de Nota Interna invalida")
        }
        return new NotasInternas(
            params.id,
            params.responsable,
            params.tipo as tiposNotasInternas,
            params.fecha,
            params.titulo,
            params.descripcion,
            params.datosAgregados,
            params.cliente,
            params.reserva,
            params.habitacion,
        )
    }
    
    static crearDesdeDTO(dto:DTONotasInternas){
        return  new NotasInternas(
            dto.id,
            dto.responsable,
            dto.tipo,
            dto.fecha,
            dto.titulo,
            dto.descripcion,
            dto?.datosAgregados,
            dto?.cliente,
            dto?.reserva,
            dto?.habitacion,
        )
    }

    modificarDesdeDTO(dto:DTONotasInternas){
        this.responsable=dto.responsable
        this.tipo=dto.tipo
        this.fecha=dto.fecha
        this.titulo=dto.titulo
        this.descripcion=dto.descripcion
        this.datosAgregados=dto?.datosAgregados
        this.cliente=dto?.cliente
        this.reserva=dto?.reserva
        this.habitacion=dto?.habitacion
    }
} 