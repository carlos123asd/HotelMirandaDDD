"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarHabitacion = void 0;
class BuscarHabitacion {
    constructor(habitacionRepo) {
        this.habitacionRepo = habitacionRepo;
    }
    async buscarPorID(idHabitacion) {
        const habitacion = await this.habitacionRepo.buscarPorId(idHabitacion);
        if (!habitacion) {
            throw new Error("No se encontro ninguna habitacion con este ID");
        }
        return habitacion;
    }
    async buscarPorCodigo(codigo) {
        const habitacion = await this.habitacionRepo.buscarPorCodigo(codigo);
        if (!habitacion) {
            throw new Error("No se encontro ninguna habitacion con este Codigo");
        }
        return habitacion;
    }
    async buscarPorFiltro(filtros) {
        const habitaciones = await this.habitacionRepo.buscarConFiltros(filtros);
        if (!habitaciones) {
            throw new Error("Habitaciones sin ninguna coincidencia");
        }
        return habitaciones;
    }
    async buscarTodasLasHabitaciones() {
        const habitaciones = await this.habitacionRepo.todasLasHabitaciones();
        if (!habitaciones) {
            throw new Error("No hay habitaciones que mostrar");
        }
        return habitaciones;
    }
}
exports.BuscarHabitacion = BuscarHabitacion;
