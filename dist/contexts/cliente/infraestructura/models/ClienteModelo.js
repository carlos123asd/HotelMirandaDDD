"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModelo = void 0;
const mongoose_1 = require("mongoose");
const SchemaCliente_1 = require("../schema/SchemaCliente");
exports.ClienteModelo = (0, mongoose_1.model)('Cliente', SchemaCliente_1.SchemaCliente);
