"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const ClienteRepoMongo_1 = require("../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo");
const CrearCliente_1 = require("../../contexts/cliente/aplicacion/casos-de-uso/CrearCliente");
const ClienteMapper_1 = require("../../contexts/cliente/infraestructura/mappers/ClienteMapper");
const ModificarCliente_1 = require("../../contexts/cliente/aplicacion/casos-de-uso/ModificarCliente");
const EliminarCliente_1 = require("../../contexts/cliente/aplicacion/casos-de-uso/EliminarCliente");
const BuscarCliente_1 = require("../../contexts/cliente/aplicacion/casos-de-uso/BuscarCliente");
class ClienteController {
    static async crearCliente(req, res) {
        const { nuevoCliente } = req.body;
        try {
            const repoMongoCliente = new ClienteRepoMongo_1.ClienteRepoMongo();
            const casoDeUso = new CrearCliente_1.CrearCliente(repoMongoCliente);
            const nuevoClienteDomain = ClienteMapper_1.ClienteMapper.desdeDocumento(nuevoCliente);
            await casoDeUso.ejecutar(nuevoClienteDomain);
            res.status(201).json({ mensaje: 'Cliente creado correctamente' });
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
    static async modificarCliente(req, res) {
        const { clienteMod } = req.body;
        try {
            const repoMongoCliente = new ClienteRepoMongo_1.ClienteRepoMongo();
            const clienteModObj = ClienteMapper_1.ClienteMapper.desdeDocumento(clienteMod);
            const casoDeUso = new ModificarCliente_1.ModificaCliente(repoMongoCliente);
            await casoDeUso.ejecutar(clienteModObj);
            res.status(201).json({ mensaje: 'Cliente modificado correctamente' });
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
    static async eliminarCliente(req, res) {
        const { cliente } = req.body;
        try {
            const repoMongoCliente = new ClienteRepoMongo_1.ClienteRepoMongo();
            const clienteModObj = ClienteMapper_1.ClienteMapper.desdeDocumento(cliente);
            const casoDeUso = new EliminarCliente_1.EliminarCliente(repoMongoCliente);
            await casoDeUso.ejecutar(clienteModObj);
            res.status(201).json({ mensaje: 'Cliente eliminado correctamente' });
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
            const repoMongoCliente = new ClienteRepoMongo_1.ClienteRepoMongo();
            const casoDeUso = new BuscarCliente_1.BuscarCliente(repoMongoCliente);
            const cliente = await casoDeUso.buscarPorId(id);
            res.status(201).json(cliente);
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
    static async buscarPorEmail(req, res) {
        const { email } = req.params;
        try {
            const repoMongoCliente = new ClienteRepoMongo_1.ClienteRepoMongo();
            const casoDeUso = new BuscarCliente_1.BuscarCliente(repoMongoCliente);
            const cliente = await casoDeUso.buscarPorEmail(email);
            res.status(201).json(cliente);
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
}
exports.ClienteController = ClienteController;
