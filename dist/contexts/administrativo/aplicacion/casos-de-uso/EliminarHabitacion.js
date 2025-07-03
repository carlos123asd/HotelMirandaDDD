"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarHabitacion = void 0;
class EliminarHabitacion {
    constructor(habitacionRepo) {
        this.habitacionRepo = habitacionRepo;
    }
    async ejecutar(responsable, dto) {
        if (!responsable.puedeEliminarHabitacion()) {
            throw new Error(`Empleado ${responsable.id} no tiene permisos para eliminar habitaciones`);
        }
        const existeHabitacion = await this.habitacionRepo.buscarPorId(dto.id);
        if (!existeHabitacion) {
            throw new Error("Habitacion no encontrada");
        }
        await this.habitacionRepo.eliminar(dto.id);
    }
}
exports.EliminarHabitacion = EliminarHabitacion;
