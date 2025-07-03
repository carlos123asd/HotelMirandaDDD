"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasInternasController = void 0;
const NotasInternasRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/NotasInternasRepoMongo");
const EmpleadoRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo");
const ReservaRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/ReservaRepoMongo");
const HabitacionRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo");
const ClienteRepoMongo_1 = require("../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo");
const CrearNotasInternas_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/CrearNotasInternas");
const NotasInternasMapper_1 = require("../../contexts/administrativo/infraestructura/mappers/NotasInternasMapper");
const ModificarNotasInternas_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/ModificarNotasInternas");
const EliminarNotasInternas_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/EliminarNotasInternas");
const BuscarNotasInternas_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/BuscarNotasInternas");
class NotasInternasController {
    static construirRepos() {
        const empleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
        const habitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
        const cliente = new ClienteRepoMongo_1.ClienteRepoMongo();
        const reserva = new ReservaRepoMongo_1.ReservaRepoMongo(cliente, habitacion, empleado);
        const notas = new NotasInternasRepoMongo_1.NotasInternasRepoMongo(empleado, reserva, habitacion, cliente);
        reserva.setNotasInternasRepo(notas);
        return { empleado, habitacion, cliente, reserva, notas };
    }
    static async crearNotaInterna(req, res) {
        const { nuevaNotaInterna } = req.body;
        try {
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new CrearNotasInternas_1.CrearNotasInternas(repos.notas);
            const nuevaNotaInternaDomain = await NotasInternasMapper_1.NotasInternasMapper.desdeDocumento(nuevaNotaInterna, {
                empleadoRepo: repos.empleado,
                clienteRepo: repos.cliente,
                reservaRepo: repos.reserva,
                habitacionRepo: repos.habitacion
            });
            await casoDeUso.ejecutar(nuevaNotaInternaDomain);
            res.status(201).json({ mensaje: 'Nota Interna creada correctamente' });
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
    static async modificarNotaInterna(req, res) {
        const { notasInternasMod } = req.body;
        try {
            const repos = NotasInternasController.construirRepos();
            const notasInternasModObj = await NotasInternasMapper_1.NotasInternasMapper.desdeDocumento(notasInternasMod, {
                empleadoRepo: repos.empleado,
                clienteRepo: repos.cliente,
                reservaRepo: repos.reserva,
                habitacionRepo: repos.habitacion
            });
            const casoDeUso = new ModificarNotasInternas_1.ModificarNotasInternas(repos.notas);
            await casoDeUso.ejecutar(notasInternasModObj, true);
            res.status(201).json({ mensaje: 'Nota Interna modificada correctamente' });
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
    static async eliminarNotaInterna(req, res) {
        const { notaInterna } = req.body;
        try {
            const repos = NotasInternasController.construirRepos();
            const notasInternasObj = await NotasInternasMapper_1.NotasInternasMapper.desdeDocumento(notaInterna, {
                empleadoRepo: repos.empleado,
                clienteRepo: repos.cliente,
                reservaRepo: repos.reserva,
                habitacionRepo: repos.habitacion
            });
            const casoDeUso = new EliminarNotasInternas_1.EliminarNotasInternas(repos.notas);
            await casoDeUso.ejecutar(notasInternasObj);
            res.status(201).json({ mensaje: "Nota Interna eliminada correctamente" });
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
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas_1.BuscarNotasInternas(repos.notas);
            const notaInternaEncontrada = await casoDeUso.buscarPorID(id);
            res.status(201).json(notaInternaEncontrada);
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
    static async buscarPorHabitacion(req, res) {
        const { id } = req.params;
        try {
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas_1.BuscarNotasInternas(repos.notas);
            const notaInternaEncontrada = await casoDeUso.buscarPorHabitacion(id);
            res.status(201).json(notaInternaEncontrada);
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
    static async buscarPorCliente(req, res) {
        const { id } = req.params;
        try {
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas_1.BuscarNotasInternas(repos.notas);
            const notaInternaEncontrada = await casoDeUso.buscarPorCliente(id);
            res.status(201).json(notaInternaEncontrada);
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
    static async buscarPorReserva(req, res) {
        const { id } = req.params;
        try {
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas_1.BuscarNotasInternas(repos.notas);
            const notaInternaEncontrada = await casoDeUso.buscarPorReserva(id);
            res.status(201).json(notaInternaEncontrada);
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
    static async buscarTodasLasNotas(req, res) {
        try {
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas_1.BuscarNotasInternas(repos.notas);
            const NotasEncontradas = await casoDeUso.buscarTodasLasNotas();
            res.status(201).json(NotasEncontradas);
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
exports.NotasInternasController = NotasInternasController;
