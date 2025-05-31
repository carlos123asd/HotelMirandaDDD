import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { Permiso } from "../value-objects/Permiso";
import { Rol } from "../value-objects/Rol";
import { ServiciosExtras } from "../value-objects/ServiciosExtras";
import { Empleado } from "./Empleado";
import { Habitacion } from "./Habitacion";
import { NotasInternas } from "./NotasInternas";

export type estados = 'pendiente' | 'aceptada' | 'en curso' | 'cancelada'
export class ReservaAdministrativa{
    constructor(
        public readonly id:string,
        public readonly estado:estados,
        public readonly asignacion:Cliente,
        public readonly habitacion:Habitacion,
        public readonly checkIn:Date,
        public readonly checkOut:Date,
        public readonly responsable:Empleado,
        public readonly extras?:ServiciosExtras[],
        public readonly notasInternas?:NotasInternas[],
    ){}

    darAltaReserva(){
        if(this.responsable.puedeDarAltaReserva()){
            console.log("Reserva hecha")
            return
        }
        throw new Error(`Empleado ${this.responsable.id} no tiene permisos para dar de alta una reserva`);
    }
    modificarReserva(){
        if(this.responsable.puedeModificarReserva()){
            console.log(`Reserva ${this.id} modificada`)
            return
        }
        throw new Error(`Empleado ${this.responsable.id} no tiene permisos para modificar una reserva`);
    }
    eliminarReserva(){
        if(this.responsable.puedeEliminarReserva()){
            console.log(`Reserva ${this.id} eliminada`)
            return
        }
        throw new Error(`Empleado ${this.responsable.id} no tiene permisos para eliminar una reserva`);
    }
}

const empleado:Empleado = new Empleado("1","carlos-medin@hotmail.com","06192698","Carlos","@qwerty",Rol.ADMIN);
const habitacion:Habitacion = new Habitacion();
const cliente:Cliente = new Cliente();
const reserva = new ReservaAdministrativa(
    "1",
    "pendiente",
    cliente,
    habitacion,
    new Date(),
    new Date(),
    empleado
)
reserva.darAltaReserva()
reserva.modificarReserva()
reserva.eliminarReserva()