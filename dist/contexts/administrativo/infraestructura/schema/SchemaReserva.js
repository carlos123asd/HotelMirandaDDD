"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaReserva = void 0;
const mongoose_1 = require("mongoose");
exports.SchemaReserva = new mongoose_1.Schema({
    estado: { type: String, enum: ['pendiente', 'aceptada', 'en curso', 'cancelada'], required: true },
    idCliente: { type: String, required: true },
    idHabitacion: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalReserva: { type: Number, required: true },
    idEmpleado: { type: String, required: false },
    extras: { type: [String], required: false },
    idNotasInternas: { type: [String], required: false },
    peticion: { type: String, required: false }
}, {
    timestamps: true
});
