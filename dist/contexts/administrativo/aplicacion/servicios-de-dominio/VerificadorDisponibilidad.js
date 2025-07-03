"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificadorDisponibilidad = void 0;
class VerificadorDisponibilidad {
    static verificar(fechaInicio, fechaFinal, reservasActuales) {
        return !reservasActuales.some((reserva) => (fechaInicio < reserva.checkOut && fechaFinal > reserva.checkIn));
    }
}
exports.VerificadorDisponibilidad = VerificadorDisponibilidad;
