"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalculadorPrecioReserva_1 = require("../../../contexts/administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva");
const Empleado_1 = require("../../../contexts/administrativo/dominio/agregados/Empleado");
const Habitacion_1 = require("../../../contexts/administrativo/dominio/agregados/Habitacion");
const Reserva_1 = require("../../../contexts/administrativo/dominio/agregados/Reserva");
const Permiso_1 = require("../../../contexts/administrativo/dominio/value-objects/Permiso");
const Rol_1 = require("../../../contexts/administrativo/dominio/value-objects/Rol");
const Servicios_1 = require("../../../contexts/administrativo/dominio/value-objects/Servicios");
const Cliente_1 = require("../../../contexts/cliente/dominio/agregados/Cliente");
describe("Reserva Administrativa", () => {
    it("crear desde Persistencia", () => {
        const responsable = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const reserva = Reserva_1.Reserva.crearDesdePersistencia({
            id: "1",
            estado: Reserva_1.estados["en curso"],
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date("2023-10-01"),
            checkOut: new Date("2023-10-05"),
            totalReserva: 150,
            responsable: responsable,
            extras: null,
            notasInternas: null
        });
        expect(reserva.id).toBe("1");
        expect(reserva.estado).toBe("en curso");
        expect(reserva.asignacion).toBe(cliente);
        expect(reserva.habitacion).toBe(habitacion);
        expect(reserva.checkIn).toBeInstanceOf(Date);
        expect(reserva.checkOut).toBeInstanceOf(Date);
        expect(reserva.responsable).toBe(responsable);
        expect(reserva.extras).toBeNull();
        expect(reserva.notasInternas).toBeNull();
    });
    it("crear desde DTO", () => {
        const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const dto = {
            id: "1",
            estado: Reserva_1.estados.aceptada,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            responsable: admin,
            extras: null,
            notasInternas: null
        };
        const totalReserva = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(dto.habitacion.precio, dto.extras, 10, dto.habitacion.oferta).calcular();
        const reserva = Reserva_1.Reserva.crearDesdeDTO(dto, totalReserva);
        expect(reserva.id).toBe(dto.id);
        expect(reserva.estado).toBe(dto.estado);
        expect(reserva.asignacion).toBe(dto.asignacion);
        expect(reserva.habitacion).toBe(dto.habitacion);
        expect(reserva.responsable).toBe(dto.responsable);
        expect(reserva.checkIn).toBe(dto.checkIn);
        expect(reserva.checkOut).toBe(dto.checkOut);
        expect(reserva.extras).toBe(dto.extras);
        expect(reserva.notasInternas).toBe(dto.notasInternas);
    });
    it("modificar desde DTO (estado de reserva)", () => {
        const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const dto = {
            id: "1",
            estado: Reserva_1.estados["en curso"],
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            responsable: admin,
            extras: null,
            notasInternas: null
        };
        const totalReserva = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(dto.habitacion.precio, dto.extras, 10, dto.habitacion.oferta).calcular();
        const reserva = new Reserva_1.Reserva("1", Reserva_1.estados.aceptada, cliente, habitacion, new Date(), new Date(), totalReserva, admin, null);
        reserva.modificarDesdeDTO(dto);
        expect(reserva.estado).toBe(dto.estado);
    });
});
