"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionMapper = void 0;
const Habitacion_1 = require("../../dominio/agregados/Habitacion");
const HabitacionModelo_1 = require("../models/HabitacionModelo");
const Servicios_1 = require("../../dominio/value-objects/Servicios");
class HabitacionMapper {
    static checkServicios(value) {
        switch (value) {
            case 'restaurante': return Servicios_1.Servicios.BUFFET;
            case 'spa': return Servicios_1.Servicios.SPA;
            case 'piscina': return Servicios_1.Servicios.PISCINA;
            case 'gimnasio': return Servicios_1.Servicios.GIMNASIO;
            case 'lavanderia': return Servicios_1.Servicios.LAVANDERIA;
            case 'transporte': return Servicios_1.Servicios.TRANSPORTE;
            case 'tour': return Servicios_1.Servicios.TOUR;
            case 'TV': return Servicios_1.Servicios.TV;
            case 'WIFI': return Servicios_1.Servicios.WIFI;
            default: throw new Error("Servicio Invalido");
        }
    }
    static desdeDocumento(doc) {
        return Habitacion_1.Habitacion.crearDesdePersistencia({
            id: doc._id,
            nombre: doc.nombre,
            descripcion: doc.descripcion,
            precio: doc.precio,
            oferta: doc.oferta,
            categoria: doc.categoria,
            servicios: doc.servicios.map((servicio) => this.checkServicios(servicio)),
            imagenes: doc.imagenes,
            piso: doc.piso,
            codigo: doc.codigo
        });
    }
    static arrayDocumento(doc) {
        return doc.map((habitacion) => this.desdeDocumento(habitacion));
    }
    static aDocumento(dto) {
        const doc = {
            _id: dto.id,
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            precio: dto.precio,
            oferta: dto.oferta,
            categoria: dto.categoria,
            servicios: dto.servicios.map((servicio) => servicio.nombre),
            imagenes: dto.imagenes,
            piso: dto.piso,
            codigo: dto.codigo
        };
        return new HabitacionModelo_1.MHabitacion(doc);
    }
}
exports.HabitacionMapper = HabitacionMapper;
