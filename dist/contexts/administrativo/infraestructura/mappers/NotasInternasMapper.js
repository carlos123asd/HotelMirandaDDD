"use strict";
//Un mapper traduce los objetos Mongo o documentos en agregados del dominio
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasInternasMapper = void 0;
const NotasInternas_1 = require("../../dominio/agregados/NotasInternas");
const NotasInternas_2 = require("../models/NotasInternas");
class NotasInternasMapper {
    static async desdeDocumento(doc, deps) {
        const responsable = await deps.empleadoRepo.buscarPorId(doc.idResponsable);
        if (!responsable)
            throw new Error("Responsable no encontrado");
        const [cliente, habitacion, reserva] = await Promise.all([
            doc.idCliente ? deps.clienteRepo.buscarPorId(doc.idCliente) : Promise.resolve(null),
            doc.idHabitacion ? deps.habitacionRepo.buscarPorId(doc.idHabitacion) : Promise.resolve(null),
            doc.idReserva ? deps.reservaRepo.buscarPorID(doc.idReserva) : Promise.resolve(null),
        ]);
        if (!cliente && !habitacion && !reserva) {
            throw new Error("No hay referencia ID para este tipo de nota");
        }
        return NotasInternas_1.NotasInternas.crearDesdePersistencia({
            id: doc._id,
            responsable: responsable,
            tipo: doc.tipo,
            fecha: doc.fecha,
            titulo: doc.titulo,
            descripcion: doc.descripcion,
            datosAgregados: doc.datosAgregados,
            cliente,
            reserva,
            habitacion
        });
    }
    static async desdeDocumentoArray(docs, deps) {
        return Promise.all(docs.map((doc) => this.desdeDocumento(doc, deps)));
    }
    static aDocumento(dto) {
        const doc = {
            _id: dto.id,
            idResponsable: dto.responsable.id,
            tipo: dto.tipo,
            fecha: dto.fecha,
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            datosAgregados: dto.datosAgregados ? dto.datosAgregados : null,
            idCliente: dto.cliente ? dto.cliente.id : null,
            idReserva: dto.reserva ? dto.reserva.id : null,
            idHabitacion: dto.habitacion ? dto.habitacion.id : null,
        };
        return new NotasInternas_2.MNotasInternas(doc);
    }
}
exports.NotasInternasMapper = NotasInternasMapper;
