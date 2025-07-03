"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionControllers = void 0;
const HabitacionRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo");
const CrearHabitacion_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/CrearHabitacion");
const EmpleadoMapper_1 = require("../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper");
const HabitacionMapper_1 = require("../../contexts/administrativo/infraestructura/mappers/HabitacionMapper");
const ModificarHabitacion_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/ModificarHabitacion");
const EliminarHabitacion_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/EliminarHabitacion");
const BuscarHabitacion_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/BuscarHabitacion");
class HabitacionControllers {
    static async crearHabitacion(req, res) {
        const { responsable, nuevaHabitacion } = req.body;
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
            const casoDeUso = new CrearHabitacion_1.CrearHabitacion(repoMongoHabitacion);
            const responsableDomain = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(responsable);
            const nuevaHabitacionDomain = HabitacionMapper_1.HabitacionMapper.desdeDocumento(nuevaHabitacion);
            await casoDeUso.ejecutar(responsableDomain, nuevaHabitacionDomain);
            res.status(201).json({ mensaje: 'Habitacion creada correctamente' });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            }
            else {
                res.status(400).json({ error: String(err) });
            }
        }
    }
    static async modificarHabitacion(req, res) {
        const { responsable, habitacionMod } = req.body;
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
            const responsableObj = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(responsable);
            const habitacionModObj = HabitacionMapper_1.HabitacionMapper.desdeDocumento(habitacionMod);
            const casoDeUso = new ModificarHabitacion_1.ModificarHabitacion(repoMongoHabitacion);
            await casoDeUso.ejecutar(responsableObj, habitacionModObj, true);
            res.status(201).json({ mensaje: 'Habitacion modificada correctamente' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(404).json({ error: String(error) });
            }
        }
    }
    static async eliminarHabitacion(req, res) {
        const { responsable, habitacion } = req.body;
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
            const responsableObj = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(responsable);
            const habitacionObj = HabitacionMapper_1.HabitacionMapper.desdeDocumento(habitacion);
            const casoDeUso = new EliminarHabitacion_1.EliminarHabitacion(repoMongoHabitacion);
            await casoDeUso.ejecutar(responsableObj, habitacionObj);
            res.status(201).json({ mensaje: "Habitacion eliminada correctamente" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(404).json({ mensaje: String(error) });
            }
        }
    }
    static async buscarPorID(req, res) {
        const { id } = req.params;
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
            const casoDeUso = new BuscarHabitacion_1.BuscarHabitacion(repoMongoHabitacion);
            const habitacionEncontrada = await casoDeUso.buscarPorID(id);
            res.status(201).json(habitacionEncontrada);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(404).json({ mensaje: String(error) });
            }
        }
    }
    static async buscarPorCodigo(req, res) {
        const { codigo } = req.params;
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
            const casoDeUso = new BuscarHabitacion_1.BuscarHabitacion(repoMongoHabitacion);
            const habitacionEncontrada = await casoDeUso.buscarPorCodigo(codigo);
            res.status(201).json(habitacionEncontrada);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(404).json({ mensaje: String(error) });
            }
        }
    }
    static async buscarPorFiltro(req, res) {
        const { filtro } = req.params;
        const filtroArray = filtro.split("-");
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
            const casoDeUso = new BuscarHabitacion_1.BuscarHabitacion(repoMongoHabitacion);
            const habitacionEncontrada = await casoDeUso.buscarPorFiltro({
                categorias: filtroArray[0] ? filtroArray[0].split(",") : null,
                precioMaximo: filtroArray[1] ? Number(filtroArray[1]) : null,
                servicios: filtroArray[2] ? filtroArray[2].split(",") : null
            });
            res.status(201).json(habitacionEncontrada);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(404).json({ mensaje: String(error) });
            }
        }
    }
    static async buscarTodasLasHabitaciones(req, res) {
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
            const casoDeUso = new BuscarHabitacion_1.BuscarHabitacion(repoMongoHabitacion);
            const habitacionEncontradas = await casoDeUso.buscarTodasLasHabitaciones();
            res.status(201).json(habitacionEncontradas);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(404).json({ mensaje: String(error) });
            }
        }
    }
}
exports.HabitacionControllers = HabitacionControllers;
