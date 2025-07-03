"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearNotasInternas = void 0;
const NotasInternas_1 = require("../../dominio/agregados/NotasInternas");
class CrearNotasInternas {
    constructor(notasRepo) {
        this.notasRepo = notasRepo;
    }
    async ejecutar(dtoNotas) {
        const existeNotaInterna = await this.notasRepo.buscarId(dtoNotas.id);
        if (existeNotaInterna) {
            throw new Error("Ya existe una Nota Interna con ese ID");
        }
        const notaInterna = NotasInternas_1.NotasInternas.crearDesdeDTO(dtoNotas);
        await this.notasRepo.guardar(notaInterna, false);
    }
}
exports.CrearNotasInternas = CrearNotasInternas;
