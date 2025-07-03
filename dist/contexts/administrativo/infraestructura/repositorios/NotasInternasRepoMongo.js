"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasInternasRepoMongo = void 0;
const NotasInternasMapper_1 = require("../mappers/NotasInternasMapper");
const NotasInternas_1 = require("../models/NotasInternas");
class NotasInternasRepoMongo {
    constructor(empleadoRepo, reservaRepo, habitacionRepo, clienteRepo) {
        this.empleadoRepo = empleadoRepo;
        this.reservaRepo = reservaRepo;
        this.habitacionRepo = habitacionRepo;
        this.clienteRepo = clienteRepo;
    }
    async guardar(notaInterna, modificar) {
        const doc = NotasInternasMapper_1.NotasInternasMapper.aDocumento(notaInterna);
        if (modificar) {
            await NotasInternas_1.MNotasInternas.findByIdAndUpdate(doc._id, doc, { upsert: true, new: true });
        }
        else {
            await doc.save();
        }
    }
    async eliminar(id) {
        try {
            const result = await NotasInternas_1.MNotasInternas.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new Error(`No se elimino ninguna Nota Interna con este ID: ${id}`);
            }
        }
        catch (error) {
            throw new Error(`Error al eliminar Nota Interna(${id})`);
        }
    }
    async buscarId(id) {
        const doc = await NotasInternas_1.MNotasInternas.findById(id);
        if (!doc) {
            return null;
        }
        return await NotasInternasMapper_1.NotasInternasMapper.desdeDocumento(doc, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        });
    }
    async buscarPorHabitacion(idHabitacion) {
        const docs = await NotasInternas_1.MNotasInternas.find({ idHabitacion: idHabitacion });
        if (!docs || docs.length === 0) {
            return null;
        }
        return await NotasInternasMapper_1.NotasInternasMapper.desdeDocumentoArray(docs, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        });
    }
    async buscarPorCliente(idCliente) {
        const docs = await NotasInternas_1.MNotasInternas.find({ idCliente: idCliente });
        if (!docs || docs.length === 0) {
            return null;
        }
        return await NotasInternasMapper_1.NotasInternasMapper.desdeDocumentoArray(docs, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        });
    }
    async buscarPorReserva(idReserva) {
        const docs = await NotasInternas_1.MNotasInternas.find({ idReserva: idReserva });
        if (!docs || docs.length === 0) {
            return null;
        }
        return await NotasInternasMapper_1.NotasInternasMapper.desdeDocumentoArray(docs, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        });
    }
    async buscarTodasLasNotas() {
        const docs = await NotasInternas_1.MNotasInternas.find();
        if (!docs || docs.length === 0) {
            return null;
        }
        return await NotasInternasMapper_1.NotasInternasMapper.desdeDocumentoArray(docs, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        });
    }
}
exports.NotasInternasRepoMongo = NotasInternasRepoMongo;
