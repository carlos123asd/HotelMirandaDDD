"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaMapper = void 0;
const Reserva_1 = require("../../dominio/agregados/Reserva");
const Servicios_1 = require("../../dominio/value-objects/Servicios");
const Reserva_2 = require("../models/Reserva");
class ReservaMapper {
    static comprobarServicio(value) {
        switch (value) {
            case Servicios_1.Servicios.BUFFET.nombre: return Servicios_1.Servicios.BUFFET;
            case Servicios_1.Servicios.SPA.nombre: return Servicios_1.Servicios.SPA;
            case Servicios_1.Servicios.PISCINA.nombre: return Servicios_1.Servicios.PISCINA;
            case Servicios_1.Servicios.GIMNASIO.nombre: return Servicios_1.Servicios.GIMNASIO;
            case Servicios_1.Servicios.LAVANDERIA.nombre: return Servicios_1.Servicios.LAVANDERIA;
            case Servicios_1.Servicios.TRANSPORTE.nombre: return Servicios_1.Servicios.TRANSPORTE;
            case Servicios_1.Servicios.TOUR.nombre: return Servicios_1.Servicios.TOUR;
            case Servicios_1.Servicios.TV.nombre: return Servicios_1.Servicios.TV;
            case Servicios_1.Servicios.WIFI.nombre: return Servicios_1.Servicios.WIFI;
            default:
                throw new Error(`Servicio desconocido: ${value}`);
        }
    }
    static serviciosExtras(values) {
        return values.map((servicio) => {
            return this.comprobarServicio(servicio);
        });
    }
    static async desdeDocumento(deps, doc) {
        const cliente = await deps.clienteRepo.buscarPorId(doc.idCliente);
        const habitacion = await deps.habitacionRepo.buscarPorId(doc.idHabitacion);
        const empleado = doc.idEmpleado ? await deps.empleadoRepo.buscarPorId(doc.idEmpleado) : null;
        if (!cliente || !habitacion) {
            throw new Error("No se encontro coincidencias para este Cliente, faltan datos relevates como cliente,habitacion,empleado");
        }
        const serviciosExtras = doc.extras ? this.serviciosExtras(doc.extras) : null;
        const notasInternas = await deps.notasInternasRepo.buscarPorReserva(doc._id);
        return new Reserva_1.Reserva(doc._id, this.checkEstado(doc.estado), cliente, habitacion, doc.checkIn, doc.checkOut, doc.totalReserva, empleado, serviciosExtras, notasInternas, doc.peticion, doc.createdAt, doc.updatedAt);
    }
    static async desdeDocumentoArray(deps, docs) {
        return Promise.all(docs.map((doc) => this.desdeDocumento(deps, doc)));
    }
    static aDocumento(dto) {
        const doc = {
            _id: dto.id ? dto.id.toString() : undefined,
            estado: dto.estado,
            idCliente: dto.asignacion.id,
            idHabitacion: dto.habitacion.id,
            checkIn: dto.checkIn,
            checkOut: dto.checkOut,
            totalReserva: dto.totalReserva,
            idEmpleado: dto.responsable ? dto.responsable.id : null,
            extras: dto.extras?.map((extra) => extra.nombre),
            idNotasInternas: dto.notasInternas?.map((notas) => notas.id),
            peticion: dto.peticion,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt
        };
        return new Reserva_2.MReserva(doc);
    }
}
exports.ReservaMapper = ReservaMapper;
ReservaMapper.checkEstado = (value) => {
    switch (value) {
        case 'pendiente': return Reserva_1.estados.pendiente;
        case 'aceptada': return Reserva_1.estados.aceptada;
        case 'en curso': return Reserva_1.estados["en curso"];
        case 'cancelada': return Reserva_1.estados.cancelada;
        default: throw new Error("Estadp de Reserva invalida");
    }
};
