"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoController = void 0;
const CrearEmpleado_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/CrearEmpleado");
const EmpleadoRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo");
const EmpleadoMapper_1 = require("../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper");
const ModificarEmpleado_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/ModificarEmpleado");
const EliminarEmpleado_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/EliminarEmpleado");
const BuscarEmpleado_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/BuscarEmpleado");
class EmpleadoController {
    static async crearEmpleado(req, res) {
        const { responsable, nuevoEmpleado } = req.body;
        try {
            const repoMongoEmpleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
            const casoDeUso = new CrearEmpleado_1.CrearEmpleado(repoMongoEmpleado);
            const responsableDomain = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(responsable);
            const nuevoEmpleadoDomain = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(nuevoEmpleado);
            await casoDeUso.ejecutar(responsableDomain, nuevoEmpleadoDomain);
            res.status(201).json({ mensaje: 'Empleado creado correctamente' });
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
    static async modificarEmpleado(req, res) {
        const { responsable, empleadoMod } = req.body;
        try {
            const repoMongoEmpleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
            const responsableObj = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(responsable);
            const empleadoModObj = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(empleadoMod);
            const casoDeUso = new ModificarEmpleado_1.ModificarEmpleado(repoMongoEmpleado);
            await casoDeUso.ejecutar(responsableObj, empleadoModObj, true);
            res.status(201).json({ mensaje: 'Empleado modificado correctamente' });
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
    static async eliminarEmpleado(req, res) {
        const { responsable, empleado } = req.body;
        try {
            const repoMongoEmpleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
            const responsableObj = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(responsable);
            const empleadoObj = EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(empleado);
            const casoDeUso = new EliminarEmpleado_1.EliminarEmpleado(repoMongoEmpleado);
            await casoDeUso.ejecutar(responsableObj, empleadoObj);
            res.status(201).json({ mensaje: "Empleado eliminado correctamente" });
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
            const repoMongoEmpleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
            const casoDeUso = new BuscarEmpleado_1.BuscarEmpleado(repoMongoEmpleado);
            const empleadoEncontrado = await casoDeUso.buscarPorId(id);
            res.status(201).json(empleadoEncontrado);
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
    static async buscarPorEmail(req, res) {
        const { email } = req.params;
        try {
            const repoMongoEmpleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
            const casoDeUso = new BuscarEmpleado_1.BuscarEmpleado(repoMongoEmpleado);
            const empleadoEncontrado = await casoDeUso.buscarPorEmail(email);
            res.status(201).json(empleadoEncontrado);
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
            const repoMongoEmpleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
            const casoDeUso = new BuscarEmpleado_1.BuscarEmpleado(repoMongoEmpleado);
            const empleadoEncontrado = await casoDeUso.buscarPorCodigo(codigo);
            res.status(201).json(empleadoEncontrado);
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
    static async buscarTodosEmpleado(req, res) {
        try {
            const repoMongoEmpleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
            const casoDeUso = new BuscarEmpleado_1.BuscarEmpleado(repoMongoEmpleado);
            const empleados = await casoDeUso.buscarTodosEmpleado();
            res.status(201).json(empleados);
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
exports.EmpleadoController = EmpleadoController;
