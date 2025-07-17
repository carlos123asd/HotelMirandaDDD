import { HydratedDocument } from "mongoose";
import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { estados, Reserva } from "../../dominio/agregados/Reserva";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { IReserva } from "../interfaces/IReserva";
import { MReserva } from "../models/Reserva";
import { IServicioRepo } from "../../dominio/repositorios/IServicioRepo";

export class ReservaMapper{

    private static checkEstado = (value:string) => {
        switch(value){
            case 'pendiente': return estados.pendiente
            case 'aceptada': return estados.aceptada
            case 'en curso': return estados["en curso"]
            case 'cancelada': return estados.cancelada
            default: throw new Error("Estadp de Reserva invalida")
        }
    }

    static async desdeDocumento(deps:{
        servicioRepo:IServicioRepo,
        clienteRepo:IClienteRepo,
        habitacionRepo:IHabitacionRepo,
        empleadoRepo:IEmpleadoRepo,
        notasInternasRepo:INotasInternasRepo
    },doc:HydratedDocument<IReserva>):Promise<Reserva>{
        const serviciosExtras = [];
        const cliente = await deps.clienteRepo.buscarPorId(doc.idCliente)
        const habitacion = await deps.habitacionRepo.buscarPorId(doc.idHabitacion)
        const empleado = doc.idEmpleado ? await deps.empleadoRepo.buscarPorId(doc.idEmpleado) : null

        if(!cliente || !habitacion){
            throw new Error("No se encontro coincidencias para este Cliente, faltan datos relevates como cliente,habitacion,empleado")
        }
        for (const servicioRef of doc.extras || []) {
            const servicio = await deps.servicioRepo.obtenerPorId(servicioRef);
            if (!servicio) {
                throw new Error(`Servicio no encontrado: ${servicioRef}`);
            }
            serviciosExtras.push(servicio);
        }   
        const notasInternas = doc.idNotasInternas ? await deps.notasInternasRepo.buscarPorReserva(doc._id) : null
        
        return new Reserva(
            doc._id,
            this.checkEstado(doc.estado),
            cliente,
            habitacion,
            doc.checkIn,
            doc.checkOut,
            doc.totalReserva,
            empleado,
            serviciosExtras,
            notasInternas,
            doc.peticion,
            doc.createdAt,
            doc.updatedAt
        )
    }
    static async desdeDocumentoArray(deps:{
        servicioRepo:IServicioRepo,
        clienteRepo:IClienteRepo,
        habitacionRepo:IHabitacionRepo,
        empleadoRepo:IEmpleadoRepo,
        notasInternasRepo:INotasInternasRepo
    },docs:HydratedDocument<IReserva>[]):Promise<Reserva[]>{
        return Promise.all(docs.map((doc:any) => this.desdeDocumento(deps,doc)))
    }

    static aDocumento(dto:Reserva){
        const doc:Partial<IReserva> =
            {
                _id:dto.id ? dto.id.toString() : undefined,
                estado: dto.estado,
                idCliente:dto.asignacion.id,
                idHabitacion:dto.habitacion.id,
                checkIn:dto.checkIn,
                checkOut:dto.checkOut,
                totalReserva:dto.totalReserva,
                idEmpleado:dto.responsable ? dto.responsable.id  : null,
                extras:dto.extras?.map((extra) => extra.nombre),
                idNotasInternas:dto.notasInternas?.map((notas) => notas.id),
                peticion:dto.peticion,
                createdAt:dto.createdAt,
                updatedAt:dto.updatedAt
            } 
        return new MReserva(doc)
    }
}