"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = exports.estados = void 0;
var estados;
(function (estados) {
    estados["pendiente"] = "pendiente";
    estados["aceptada"] = "aceptada";
    estados["en curso"] = "en curso";
    estados["cancelada"] = "cancelada";
})(estados || (exports.estados = estados = {}));
class Reserva {
    constructor(id, estado, asignacion, habitacion, checkIn, checkOut, totalReserva, responsable, extras, notasInternas, peticion, createdAt, updatedAt) {
        this.id = id;
        this.estado = estado;
        this.asignacion = asignacion;
        this.habitacion = habitacion;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalReserva = totalReserva;
        this.responsable = responsable;
        this.extras = extras;
        this.notasInternas = notasInternas;
        this.peticion = peticion;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static crearDesdePersistencia(params) {
        if (!Object.values(estados).includes(params.estado)) {
            throw new Error("Estado de reserva invalida");
        }
        return new Reserva(params.id, params.estado, params.asignacion, params.habitacion, params.checkIn, params.checkOut, params.totalReserva, params.responsable, params.extras, params.notasInternas, params.peticion, params.createdAt, params.updatedAt);
    }
    static crearDesdeDTO(dto, totalReserva) {
        return new Reserva(dto.id, dto.estado, dto.asignacion, dto.habitacion, dto.checkIn, dto.checkOut, totalReserva, dto.responsable, dto.extras, dto.notasInternas, dto.peticion, dto.createdAt, dto.updatedAt);
    }
    modificarDesdeDTO(dto) {
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
exports.Reserva = Reserva;
