//Un mapper traduce los objetos Mongo o documentos en agregados del dominio

import { HydratedDocument } from "mongoose";
import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { IReservaClienteRepo } from "../../../cliente/dominio/repositorios/IReservaClienteRepo";
import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { INotasInternas } from "../interfaces/INotasInternas";
import { MNotasInternas } from "../models/NotasInternas";

export class NotasInternasMapper {
    static async desdeDocumento(
        doc: HydratedDocument<INotasInternas>,
        deps: {
            empleadoRepo: IEmpleadoRepo,
            clienteRepo: IClienteRepo,
            reservaClienteRepo: IReservaClienteRepo,
            reservaAdministrativaRepo: IReservaRepo,
            habitacionRepo: IHabitacionRepo
        }
    ): Promise<NotasInternas> {
        const responsable = await deps.empleadoRepo.buscarPorId(doc.idResponsable);
        if (!responsable) throw new Error("Responsable no encontrado");

        const cliente = doc.idCliente ? await deps.clienteRepo.buscarPorId(doc.idCliente) : null;
        const habitacion = doc.idHabitacion ? await deps.habitacionRepo.buscarPorId(doc.idHabitacion) : null;

        let reserva = null;
        if (doc.tipoReserva === 'cliente' && doc.idReserva) {
            reserva = await deps.reservaClienteRepo.buscarPorId(doc.idReserva);
        } else if (doc.idReserva) {
            reserva = await deps.reservaAdministrativaRepo.buscarPorID(doc.idReserva);
        }
        
        if(!cliente && !habitacion && !reserva){
            throw new Error("No hay referencia ID para este tipo de nota")
        }

        return NotasInternas.crearDesdePersistencia({
            id:doc._id,
            responsable:responsable,
            tipo:doc.tipo,
            fecha:doc.fecha,
            titulo:doc.titulo,
            descripcion:doc.descripcion,
            datosAgregados:doc.datosAgregados,
            cliente,
            reserva,
            habitacion
        });
    }

    static async desdeDocumentoArray(
        docs: HydratedDocument<INotasInternas>[],
        deps: {
            empleadoRepo: IEmpleadoRepo,
            clienteRepo: IClienteRepo,
            reservaClienteRepo: IReservaClienteRepo,
            reservaAdministrativaRepo: IReservaRepo,
            habitacionRepo: IHabitacionRepo
        }
    ):Promise<NotasInternas[]> {
        return Promise.all(docs.map(async (doc:HydratedDocument<INotasInternas>) => this.desdeDocumento(doc,deps))  
        )
    }

    static aDocumento(dto:NotasInternas){
        const doc:Partial<INotasInternas> = {
            _id:dto.id,
            idResponsable: dto.responsable.id,
            tipo: dto.tipo,
            fecha: dto.fecha,
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            tipoReserva: dto.reserva?.tipoReserva ?? null,
            datosAgregados: dto.datosAgregados ? dto.datosAgregados : null,
            idCliente: dto.cliente ? dto.cliente.id : null,
            idReserva: dto.reserva ? dto.reserva.id.toString() : null,
            idHabitacion: dto.habitacion ? dto.habitacion.id.toString() : null,
        }

        return new MNotasInternas(doc)
    }
}
