"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarEmpleado = void 0;
class BuscarEmpleado {
    constructor(empleadoRepo) {
        this.empleadoRepo = empleadoRepo;
    }
    async buscarPorId(idEmpleado) {
        const empleado = await this.empleadoRepo.buscarPorId(idEmpleado);
        if (!empleado) {
            throw new Error("No se enconto empleado con este ID");
        }
        return empleado;
    }
    async buscarPorEmail(email) {
        const empleado = await this.empleadoRepo.buscarPorEmail(email);
        if (!empleado) {
            throw new Error("No se encontro ningún empleado con este correo");
        }
        return empleado;
    }
    async buscarPorCodigo(codigo) {
        const empleado = await this.empleadoRepo.buscarPorCodigo(codigo);
        if (!empleado) {
            throw new Error("No se encontro ningún empleado con este Codigo");
        }
        return empleado;
    }
    async buscarTodosEmpleado() {
        const empleados = await this.empleadoRepo.buscarTodosEmpleado();
        if (!empleados) {
            throw new Error("No se encontro empleados");
        }
        return empleados;
    }
}
exports.BuscarEmpleado = BuscarEmpleado;
