"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarNotasInternas = void 0;
class EliminarNotasInternas {
    constructor(notasRepo) {
        this.notasRepo = notasRepo;
    }
    async ejecutar(dtoNotas) {
        const notaEncontrada = await this.notasRepo.buscarId(dtoNotas.id);
        if (!notaEncontrada) {
            throw new Error(`Nota no encontrada con este ID: ${dtoNotas.id}`);
        }
        await this.notasRepo.eliminar(dtoNotas.id);
    }
}
exports.EliminarNotasInternas = EliminarNotasInternas;
