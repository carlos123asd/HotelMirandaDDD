"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MNotasInternas = void 0;
const mongoose_1 = require("mongoose");
const SchemaNotasInternas_1 = require("../schema/SchemaNotasInternas");
exports.MNotasInternas = (0, mongoose_1.model)('NotasInternas', SchemaNotasInternas_1.SchemaNotasInternas);
