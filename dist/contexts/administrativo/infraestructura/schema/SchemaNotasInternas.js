"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaNotasInternas = void 0;
const mongoose_1 = require("mongoose");
exports.SchemaNotasInternas = new mongoose_1.Schema({
    idResponsable: { type: String, required: true },
    tipo: { type: String, enum: ['Habitacion', 'Cliente', 'Reserva'], required: true },
    fecha: { type: Date, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    datosAgregados: { type: String, required: false },
    idCliente: { type: String, required: false },
    idReserva: { type: String, required: false },
    idHabitacion: { type: String, required: false },
}, {
    timestamps: true
});
