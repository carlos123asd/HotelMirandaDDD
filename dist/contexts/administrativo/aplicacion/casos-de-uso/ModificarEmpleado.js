"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarEmpleado = void 0;
class ModificarEmpleado {
    constructor(empleadoRepo) {
        this.empleadoRepo = empleadoRepo;
    }
    async ejecutar(responsable, dto, modificar = false) {
        if (!responsable.puedeModificarEmpleado()) {
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar otros empleados`);
        }
        const empleadoExistente = await this.empleadoRepo.buscarPorId(dto.id);
        if (!empleadoExistente) {
            throw new Error("Empleado no encontrado");
        }
        empleadoExistente.modificarDesdeDTO(dto);
        await this.empleadoRepo.guardar(empleadoExistente, modificar);
    }
}
exports.ModificarEmpleado = ModificarEmpleado;
