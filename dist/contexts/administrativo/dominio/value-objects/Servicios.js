"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicios = void 0;
class Servicios {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}
exports.Servicios = Servicios;
Servicios.BUFFET = new Servicios("restaurante", 12.00);
Servicios.SPA = new Servicios("spa", 6.00);
Servicios.PISCINA = new Servicios("piscina", 4.00);
Servicios.GIMNASIO = new Servicios("gimnasio", 5.00);
Servicios.LAVANDERIA = new Servicios("lavanderia", 5.00);
Servicios.TRANSPORTE = new Servicios("transporte", 15.00);
Servicios.TOUR = new Servicios("tour", 30.00);
Servicios.TV = new Servicios("TV", 0);
Servicios.WIFI = new Servicios("WIFI", 0);
