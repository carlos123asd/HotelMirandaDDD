"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaRepoMongo = void 0;
const ReservaMapper_1 = require("../mappers/ReservaMapper");
const Reserva_1 = require("../models/Reserva");
class ReservaRepoMongo {
    constructor(clienteRepo, habitacionRepo, empleadoRepo) {
        this.clienteRepo = clienteRepo;
        this.habitacionRepo = habitacionRepo;
        this.empleadoRepo = empleadoRepo;
    }
    setNotasInternasRepo(repo) {
        this.notasInternasRepo = repo;
    }
    async buscarTodasReservas() {
        const docs = await Reserva_1.MReserva.find();
        if (!docs) {
            return null;
        }
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }
        return ReservaMapper_1.ReservaMapper.desdeDocumentoArray({
            clienteRepo: this.clienteRepo,
            habitacionRepo: this.habitacionRepo,
            empleadoRepo: this.empleadoRepo,
            notasInternasRepo: this.notasInternasRepo
        }, docs);
    }
    async buscarPorID(id) {
        const doc = await Reserva_1.MReserva.findById(id);
        if (!doc) {
            return null;
        }
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }
        return ReservaMapper_1.ReservaMapper.desdeDocumento({
            clienteRepo: this.clienteRepo,
            habitacionRepo: this.habitacionRepo,
            empleadoRepo: this.empleadoRepo,
            notasInternasRepo: this.notasInternasRepo
        }, doc);
    }
    async buscarPorCliente(idCliente) {
        const docs = await Reserva_1.MReserva.find({ idCliente: idCliente });
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }
        return ReservaMapper_1.ReservaMapper.desdeDocumentoArray({
            clienteRepo: this.clienteRepo,
            habitacionRepo: this.habitacionRepo,
            empleadoRepo: this.empleadoRepo,
            notasInternasRepo: this.notasInternasRepo
        }, docs);
    }
    async buscarPorHabitacion(idHabitacion) {
        const docs = await Reserva_1.MReserva.find({ idHabitacion: idHabitacion });
        if (!docs) {
            return null;
        }
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }
        return ReservaMapper_1.ReservaMapper.desdeDocumentoArray({
            clienteRepo: this.clienteRepo,
            habitacionRepo: this.habitacionRepo,
            empleadoRepo: this.empleadoRepo,
            notasInternasRepo: this.notasInternasRepo
        }, docs);
    }
    async guardar(reserva, modificar) {
        const doc = ReservaMapper_1.ReservaMapper.aDocumento(reserva);
        if (modificar) {
            await Reserva_1.MReserva.findByIdAndUpdate(doc._id, doc, { upsert: true, new: true });
        }
        else {
            await doc.save();
        }
    }
    async eliminar(id) {
        const doc = await Reserva_1.MReserva.findById(id);
        if (!doc) {
            throw new Error("No se encontro ninguna reserva con este ID para su eliminacion");
        }
        if (doc.estado === "cancelada") {
            const result = await Reserva_1.MReserva.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new Error("No se pudo eliminar esta reserva");
            }
        }
        else {
            throw new Error("La reseva no se puede eliminar porque ya esta aceptada o en curso, si esta pendiente primero puedes cancelar la reserva");
        }
    }
}
exports.ReservaRepoMongo = ReservaRepoMongo;
