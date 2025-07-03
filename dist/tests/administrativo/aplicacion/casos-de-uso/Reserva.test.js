"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Empleado_1 = require("../../../../contexts/administrativo/dominio/agregados/Empleado");
const Habitacion_1 = require("../../../../contexts/administrativo/dominio/agregados/Habitacion");
const Reserva_1 = require("../../../../contexts/administrativo/dominio/agregados/Reserva");
const Permiso_1 = require("../../../../contexts/administrativo/dominio/value-objects/Permiso");
const Rol_1 = require("../../../../contexts/administrativo/dominio/value-objects/Rol");
const Servicios_1 = require("../../../../contexts/administrativo/dominio/value-objects/Servicios");
const Cliente_1 = require("../../../../contexts/cliente/dominio/agregados/Cliente");
describe("Casos de uso - Reserva Administrativa", () => {
    const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
    const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
    const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
    const reserva = new Reserva_1.Reserva("1", Reserva_1.estados.aceptada, cliente, habitacion, new Date(), new Date(), 150, admin, null);
    const reservaRrepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarPorID: jest.fn().mockReturnValue(reserva),
        buscarPorCliente: jest.fn().mockReturnValue([reserva]),
        buscarPorHabitacion: jest.fn().mockReturnValue([reserva]),
        buscarTodasReservas: jest.fn().mockReturnValue([reserva])
    };
    it("crear reserva", async () => {
        await reservaRrepo.guardar(reserva, false);
        expect(reservaRrepo.guardar).toHaveBeenCalledWith(reserva, false);
    });
    it("eliminar reserva", async () => {
        const id = "1";
        await reservaRrepo.eliminar(id);
        expect(reservaRrepo.eliminar).toHaveBeenCalledWith(id);
    });
    it("buscar reserva por id", async () => {
        const habitacion = await reservaRrepo.buscarPorID("1");
        expect(habitacion).not.toBeNull();
        expect(habitacion).toBeInstanceOf(Reserva_1.Reserva);
        expect(habitacion?.id).toBe("1");
    });
    it("buscar reserva por habitacion", async () => {
        const notas = await reservaRrepo.buscarPorHabitacion("1");
        expect(notas).not.toBeNull();
        expect(notas).toBeInstanceOf(Array);
        expect(notas?.length).toBeGreaterThan(0);
        expect(notas?.[0]).toBeInstanceOf(Reserva_1.Reserva);
        expect(notas?.[0].habitacion?.id).toBe("1");
    });
});
