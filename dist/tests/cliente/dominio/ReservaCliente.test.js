"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalculadorPrecioReserva_1 = require("../../../contexts/administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva");
const Habitacion_1 = require("../../../contexts/administrativo/dominio/agregados/Habitacion");
const Reserva_1 = require("../../../contexts/administrativo/dominio/agregados/Reserva");
const Servicios_1 = require("../../../contexts/administrativo/dominio/value-objects/Servicios");
const Cliente_1 = require("../../../contexts/cliente/dominio/agregados/Cliente");
describe("Reserva en el Cliente", () => {
    it("crear desde persistencia", () => {
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const reserva = new Reserva_1.Reserva("1", Reserva_1.estados.pendiente, cliente, habitacion, new Date(), new Date(), new CalculadorPrecioReserva_1.CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(), null);
        const reservaDesdePersistencia = Reserva_1.Reserva.crearDesdePersistencia({
            id: reserva.id ?? "",
            estado: Reserva_1.estados.aceptada,
            asignacion: reserva.asignacion,
            habitacion: reserva.habitacion,
            checkIn: reserva.checkIn,
            checkOut: reserva.checkOut,
            totalReserva: reserva.totalReserva,
            responsable: {}, // Replace with a valid Empleado instance in real tests
            extras: null,
            notasInternas: null,
            peticion: null,
        });
        expect(reservaDesdePersistencia).toEqual(reserva);
    });
    it("crear desde DTO", () => {
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const reservaDTO = {
            id: "1",
            estado: Reserva_1.estados.pendiente,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            totalReserva: new CalculadorPrecioReserva_1.CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            extras: null
        };
        const totalReserva = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(reservaDTO.habitacion.precio, reservaDTO.extras, 0, reservaDTO.habitacion.oferta).calcular();
        const reserva = new Reserva_1.Reserva("1", Reserva_1.estados.pendiente, cliente, habitacion, new Date(), new Date(), new CalculadorPrecioReserva_1.CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(), null);
        const reservaDesdeDTO = Reserva_1.Reserva.crearDesdeDTO(reservaDTO, totalReserva);
        expect(reservaDesdeDTO).toEqual(reserva);
    });
    it("modificar desde DTO (ESTADO)", () => {
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const reservaDTO = {
            id: "1",
            estado: Reserva_1.estados.pendiente,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            totalReserva: new CalculadorPrecioReserva_1.CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            extras: null
        };
        const totalReserva = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(reservaDTO.habitacion.precio, reservaDTO.extras, 0, reservaDTO.habitacion.oferta).calcular();
        const reservaDesdeDTO = Reserva_1.Reserva.crearDesdeDTO(reservaDTO, totalReserva);
        const nuevoDTO = {
            id: "1",
            estado: Reserva_1.estados.aceptada,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            totalReserva: new CalculadorPrecioReserva_1.CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            extras: null
        };
        reservaDesdeDTO.modificarDesdeDTO(nuevoDTO);
        expect(reservaDesdeDTO.estado).toBe(Reserva_1.estados.aceptada);
    });
});
