"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarNotasInternas = void 0;
class ModificarNotasInternas {
    constructor(notasrepo) {
        this.notasrepo = notasrepo;
    }
    async ejecutar(dtoNotas, modificar) {
        const notaEncontrada = await this.notasrepo.buscarId(dtoNotas.id);
        if (!notaEncontrada) {
            throw new Error(`No se encontor ninguna Nota Interna con esta ID:${dtoNotas.id}`);
        }
        notaEncontrada.modificarDesdeDTO(dtoNotas);
        await this.notasrepo.guardar(notaEncontrada, modificar);
    }
}
exports.ModificarNotasInternas = ModificarNotasInternas;
