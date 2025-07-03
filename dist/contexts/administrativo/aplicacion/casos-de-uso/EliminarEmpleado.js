"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarEmpleado = void 0;
class EliminarEmpleado {
    constructor(empleadoRepo) {
        this.empleadoRepo = empleadoRepo;
    }
    async ejecutar(responsable, dto) {
        if (!responsable.puedeEliminarEmpleado()) {
            throw new Error(`Empleado ${responsable.id} no tiene permisos para eliminar otros empleados`);
        }
        const empleadoExiste = await this.empleadoRepo.buscarPorId(dto.id);
        if (!empleadoExiste) {
            throw new Error("Empleado no encontrado");
        }
        await this.empleadoRepo.eliminar(dto.id);
    }
}
exports.EliminarEmpleado = EliminarEmpleado;
