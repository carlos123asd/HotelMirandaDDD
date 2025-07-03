"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerarCodigoHabitacion = void 0;
class GenerarCodigoHabitacion {
    constructor(repoHabitacion) {
        this.repoHabitacion = repoHabitacion;
    }
    cadenaPiso(numero) {
        return numero.padStart(2, '0');
    }
    async generar(piso) {
        const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //10 habitaciones por piso
        const numeroHabitaciones = await this.repoHabitacion.ContarHabitaciones();
        const codigo = this.cadenaPiso(piso) + letras[numeroHabitaciones % letras.length];
        const existeCodigo = await this.repoHabitacion.buscarPorCodigo(codigo);
        if (existeCodigo) {
            throw new Error("Ya existe una Habitacion con este codigo");
        }
        return codigo;
    }
}
exports.GenerarCodigoHabitacion = GenerarCodigoHabitacion;
