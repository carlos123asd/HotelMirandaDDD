import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { ReservaCliente } from "../../../cliente/dominio/agregados/ReservaCliente";
import { DTONotasInternas } from "../../aplicacion/dtos/DTONotasInternas";
import { Empleado } from "./Empleado";
import { Habitacion } from "./Habitacion";
import { ReservaAdministrativa } from "./ReservaAdministrativa";

export type tiposNotasInternas = 'Habitacion' | 'Cliente' | 'Reserva'

export class NotasInternas{
    constructor(
        public readonly id:string,
        public responsable:Empleado,
        public tipo:tiposNotasInternas,
        public fecha:Date,
        public titulo:string,
        public descripcion:string,
        public datosAgregados?:string[],
        public cliente?:Cliente | null,
        public reserva?:ReservaAdministrativa|ReservaCliente | null,
        public habitacion?:Habitacion | null,
    ){}
    
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
        if(this.id !== dto.id){
            throw new Error("No se puede modificar el ID de una Nota Interna")
        }
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