"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosExtras = void 0;
const Servicios_1 = require("./Servicios");
class ServiciosExtras extends Servicios_1.Servicios {
    constructor(nombre, precio) {
        super(nombre, precio);
        this.nombre = nombre;
        this.precio = precio;
    }
}
exports.ServiciosExtras = ServiciosExtras;
