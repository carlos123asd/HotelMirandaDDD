"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasInternas = exports.tiposNotasInternas = void 0;
var tiposNotasInternas;
(function (tiposNotasInternas) {
    tiposNotasInternas["Habitacion"] = "Habitacion";
    tiposNotasInternas["Cliente"] = "Cliente";
    tiposNotasInternas["Reserva"] = "Reserva";
})(tiposNotasInternas || (exports.tiposNotasInternas = tiposNotasInternas = {}));
class NotasInternas {
    constructor(id, responsable, tipo, fecha, titulo, descripcion, datosAgregados, cliente, reserva, habitacion) {
        this.id = id;
        this.responsable = responsable;
        this.tipo = tipo;
        this.fecha = fecha;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.datosAgregados = datosAgregados;
        this.cliente = cliente;
        this.reserva = reserva;
        this.habitacion = habitacion;
    }
    static crearDesdePersistencia(params) {
        if (!Object.values(tiposNotasInternas).includes(params.tipo)) {
            throw new Error("Tipo de Nota Interna invalida");
        }
        return new NotasInternas(params.id, params.responsable, params.tipo, params.fecha, params.titulo, params.descripcion, params.datosAgregados, params.cliente, params.reserva, params.habitacion);
    }
    static crearDesdeDTO(dto) {
        return new NotasInternas(dto.id, dto.responsable, dto.tipo, dto.fecha, dto.titulo, dto.descripcion, dto?.datosAgregados, dto?.cliente, dto?.reserva, dto?.habitacion);
    }
    modificarDesdeDTO(dto) {
        this.responsable = dto.responsable;
        this.tipo = dto.tipo;
        this.fecha = dto.fecha;
        this.titulo = dto.titulo;
        this.descripcion = dto.descripcion;
        this.datosAgregados = dto?.datosAgregados;
        this.cliente = dto?.cliente;
        this.reserva = dto?.reserva;
        this.habitacion = dto?.habitacion;
    }
}
exports.NotasInternas = NotasInternas;
