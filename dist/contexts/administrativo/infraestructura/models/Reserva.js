"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MReserva = void 0;
const mongoose_1 = require("mongoose");
const SchemaReserva_1 = require("../schema/SchemaReserva");
exports.MReserva = (0, mongoose_1.model)('Reserva', SchemaReserva_1.SchemaReserva);
