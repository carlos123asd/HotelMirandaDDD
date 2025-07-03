"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearHabitacion = void 0;
const Habitacion_1 = require("../../dominio/agregados/Habitacion");
const GenerarCodigoHabitacion_1 = require("../servicios-de-dominio/GenerarCodigoHabitacion");
class CrearHabitacion {
    constructor(habitacionRepo) {
        this.habitacionRepo = habitacionRepo;
    }
    async ejecutar(responsable, nuevaHabitacionDTO) {
        if (!responsable.puedeDarAltaHabitacion()) {
            throw new Error(`Empleado ${responsable.id} no tiene permisos para dar de alta a habitaciones`);
        }
        const codigo = await new GenerarCodigoHabitacion_1.GenerarCodigoHabitacion(this.habitacionRepo).generar(nuevaHabitacionDTO.piso);
        const nuevaHabitacion = Habitacion_1.Habitacion.crearDesdeDTO(nuevaHabitacionDTO, codigo);
        await this.habitacionRepo.guardar(nuevaHabitacion, false);
    }
}
exports.CrearHabitacion = CrearHabitacion;
