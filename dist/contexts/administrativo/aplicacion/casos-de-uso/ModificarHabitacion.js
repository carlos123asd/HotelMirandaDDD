"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarHabitacion = void 0;
class ModificarHabitacion {
    constructor(habitacionRepo) {
        this.habitacionRepo = habitacionRepo;
    }
    async ejecutar(responsable, dto, modificar) {
        if (!responsable.puedeModificarHabitacion()) {
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar habitaciones`);
        }
        const habitacion = await this.habitacionRepo.buscarPorId(dto.id);
        if (!habitacion) {
            throw new Error("Habitacion no encontrada");
        }
        habitacion.modificarDesdeDTO(dto);
        await this.habitacionRepo.guardar(habitacion, modificar);
    }
}
exports.ModificarHabitacion = ModificarHabitacion;
