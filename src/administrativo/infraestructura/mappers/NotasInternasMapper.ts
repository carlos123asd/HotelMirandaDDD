//Un mapper traduce los objetos Mongo o documentos en agregados del dominio

import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { IReservaClienteRepo } from "../../../cliente/dominio/repositorios/IReservaClienteRepo";
import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";

export class NotasInternasMapper {
    static async desdeDocumento(
        doc: any,
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
        if (doc.tipoReserva === 'cliente' && doc.idReservaCliente) {
            reserva = await deps.reservaClienteRepo.buscarPorId(doc.idReservaCliente);
        } else if (doc.idReservaAdministrativa) {
            reserva = await deps.reservaAdministrativaRepo.buscarPorID(doc.idReservaAdministrativa);
        }

        return new NotasInternas(
            doc._id.toString(),
            responsable,
            doc.tipo,
            doc.fecha,
            doc.titulo,
            doc.descripcion,
            doc.datosAgregados,
            cliente,
            reserva,
            habitacion
        );
    }

    static async desdeDocumentoArray(
        docs: any[],
        deps: {
            empleadoRepo: IEmpleadoRepo,
            clienteRepo: IClienteRepo,
            reservaClienteRepo: IReservaClienteRepo,
            reservaAdministrativaRepo: IReservaRepo,
            habitacionRepo: IHabitacionRepo
        }
    ):Promise<NotasInternas[]> {
        return Promise.all(docs.map(async (doc) => {
                const responsable = await deps.empleadoRepo.buscarPorId(doc.idResponsable);
                if (!responsable) throw new Error("Responsable no encontrado");

                const cliente = doc.idCliente ? await deps.clienteRepo.buscarPorId(doc.idCliente) : null;
                const habitacion = doc.idHabitacion ? await deps.habitacionRepo.buscarPorId(doc.idHabitacion) : null;

                let reserva = null;
                if (doc.tipoReserva === 'cliente' && doc.idReservaCliente) {
                    reserva = await deps.reservaClienteRepo.buscarPorId(doc.idReservaCliente);
                } else if (doc.idReservaAdministrativa) {
                    reserva = await deps.reservaAdministrativaRepo.buscarPorID(doc.idReservaAdministrativa);
                }

                return new NotasInternas(
                    doc._id.toString(),
                    responsable,
                    doc.tipo,
                    doc.fecha,
                    doc.titulo,
                    doc.descripcion,
                    doc.datosAgregados,
                    cliente,
                    reserva,
                    habitacion
                );
            })  
        )
    }
}
