"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaController = void 0;
const CrearReserva_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/CrearReserva");
const EmpleadoRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo");
const HabitacionRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo");
const ClienteRepoMongo_1 = require("../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo");
const ReservaMapper_1 = require("../../contexts/administrativo/infraestructura/mappers/ReservaMapper");
const NotasInternasRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/NotasInternasRepoMongo");
const ModificarReserva_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/ModificarReserva");
const EliminarReserva_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/EliminarReserva");
const BuscarReserva_1 = require("../../contexts/administrativo/aplicacion/casos-de-uso/BuscarReserva");
const ReservaRepoMongo_1 = require("../../contexts/administrativo/infraestructura/repositorios/ReservaRepoMongo");
class ReservaController {
    static construirRepos() {
        const empleado = new EmpleadoRepoMongo_1.EmpleadoRepoMongo();
        const habitacion = new HabitacionRepoMongo_1.HabitacionRepoMongo();
        const cliente = new ClienteRepoMongo_1.ClienteRepoMongo();
        const reserva = new ReservaRepoMongo_1.ReservaRepoMongo(cliente, habitacion, empleado);
        const notas = new NotasInternasRepoMongo_1.NotasInternasRepoMongo(empleado, reserva, habitacion, cliente);
        reserva.setNotasInternasRepo(notas);
        return { empleado, habitacion, cliente, reserva, notas };
    }
    static async crearReserva(req, res) {
        const { reserva, recargo } = req.body;
        try {
            const repo = ReservaController.construirRepos();
            const casoDeUso = new CrearReserva_1.CrearReserva(repo.reserva);
            const reservaObj = await ReservaMapper_1.ReservaMapper.desdeDocumento({
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
            }, reserva);
            await casoDeUso.ejecutar(reservaObj, recargo);
            res.status(201).json({ message: "Reserva creada correctamente" });
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
    static async modificarReserva(req, res) {
        const { reserva } = req.body;
        try {
            const repo = ReservaController.construirRepos();
            const casoDeUso = new ModificarReserva_1.ModificarReserva(repo.reserva);
            const reservaObj = await ReservaMapper_1.ReservaMapper.desdeDocumento({
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
            }, reserva);
            await casoDeUso.ejecutar(reservaObj);
            res.status(201).json({ message: "Reserva modificada correctamente" });
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
    static async eliminarReserva(req, res) {
        const { reserva } = req.body;
        try {
            const repo = ReservaController.construirRepos();
            const casoDeUso = new EliminarReserva_1.EliminarReserva(repo.reserva);
            const reservaObj = await ReservaMapper_1.ReservaMapper.desdeDocumento({
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
            }, reserva);
            await casoDeUso.ejecutar(reservaObj);
            res.status(201).json({ message: "Reserva eliminada correctamente" });
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
    static async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const repo = ReservaController.construirRepos();
            const casoDeUso = new BuscarReserva_1.BuscarReserva(repo.reserva);
            const reserva = await casoDeUso.buscarPorId(id);
            res.status(201).json(reserva);
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
    static async buscarPorCliente(req, res) {
        const { id } = req.params;
        try {
            const repo = ReservaController.construirRepos();
            const casoDeUso = new BuscarReserva_1.BuscarReserva(repo.reserva);
            const reservas = await casoDeUso.buscarPorCliente(id);
            res.status(201).json(reservas);
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
    static async buscarPorHabitacion(req, res) {
        const { id } = req.params;
        try {
            const repo = ReservaController.construirRepos();
            const casoDeUso = new BuscarReserva_1.BuscarReserva(repo.reserva);
            const reservas = await casoDeUso.buscarPorHabitacion(id);
            res.status(201).json(reservas);
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
    static async buscarTodasReservas(req, res) {
        try {
            const repo = ReservaController.construirRepos();
            const casoDeUso = new BuscarReserva_1.BuscarReserva(repo.reserva);
            const reservas = await casoDeUso.buscarTodasReservas();
            res.status(201).json(reservas);
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
exports.ReservaController = ReservaController;
