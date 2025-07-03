"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearEmpleado = void 0;
const Empleado_1 = require("../../dominio/agregados/Empleado");
const GenerarCodigoEmpleado_1 = require("../servicios-de-dominio/GenerarCodigoEmpleado");
class CrearEmpleado {
    constructor(empleadoRepo) {
        this.empleadoRepo = empleadoRepo;
    }
    async ejecutar(responsable, nuevoEmpleadoDTO, modificar = false) {
        if (!responsable.puedeDarAltaEmpleado()) {
            throw new Error(`Empleado ${responsable.id} no tiene permisos para dar de alta a otros empleados`);
        }
        const codigoEmppleado = (0, GenerarCodigoEmpleado_1.GenerarCodigoEmpleado)(nuevoEmpleadoDTO.email, nuevoEmpleadoDTO.telefono);
        const nuevoEmpleado = Empleado_1.Empleado.crearDesdeDTO(nuevoEmpleadoDTO, codigoEmppleado);
        const existeEmpleado = await this.empleadoRepo.buscarPorEmail(nuevoEmpleado.email);
        if (existeEmpleado) {
            throw new Error("Ya existe un empleado con este correo electronico");
        }
        await this.empleadoRepo.guardar(nuevoEmpleado, modificar);
    }
}
exports.CrearEmpleado = CrearEmpleado;
