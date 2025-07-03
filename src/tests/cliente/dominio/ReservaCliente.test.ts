import { DTOReserva } from "../../../contexts/administrativo/aplicacion/dtos/DTOReserva"
import { CalculadorPrecioReserva } from "../../../contexts/administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva"
import { categoriaHabitacion, Habitacion } from "../../../contexts/administrativo/dominio/agregados/Habitacion"
import { estados, Reserva } from "../../../contexts/administrativo/dominio/agregados/Reserva"
import { Servicios } from "../../../contexts/administrativo/dominio/value-objects/Servicios"
import { Cliente, metodoPago } from "../../../contexts/cliente/dominio/agregados/Cliente"


describe("Reserva en el Cliente", () => {
    it("crear desde persistencia", () => {
        const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const habitacion = new Habitacion(
            "1",
            "Habitacion Deluxe",
            "Habitacion con vista al mar",
            150,
            10,
            categoriaHabitacion.Suite,
            [Servicios.WIFI, Servicios.BUFFET],
            ["image1.jpg", "image2.jpg"],
            "2",
            "D123"
        )
        const reserva = new Reserva(
            "1",
            estados.aceptada,
            cliente,
            habitacion,
            new Date(),
            new Date(),
            new CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            null
        )
        // Set fields to match those from persistencia
        ;(reserva as any).extras = null;
        (reserva as any).notasInternas = null;
        (reserva as any).peticion = null;
        (reserva as any).responsable = {} as any;

        const reservaDesdePersistencia = Reserva.crearDesdePersistencia({
            id: reserva.id ?? "",
            estado:estados.aceptada,
            asignacion: reserva.asignacion,
            habitacion: reserva.habitacion,
            checkIn: reserva.checkIn,
            checkOut: reserva.checkOut,
            totalReserva: reserva.totalReserva,
            responsable: {} as any, // Replace with a valid Empleado instance in real tests
            extras:null,
            notasInternas:null,
            peticion:null,
        })
        expect(reservaDesdePersistencia).toEqual(reserva)
    })
    it("crear desde DTO", () => {
        const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const habitacion = new Habitacion(
            "1",
            "Habitacion Deluxe",
            "Habitacion con vista al mar",
            150,
            10,
            categoriaHabitacion.Suite,
            [Servicios.WIFI, Servicios.BUFFET],
            ["image1.jpg", "image2.jpg"],
            "2",
            "D123"
        )
        const reservaDTO:DTOReserva = {
            id: "1",
            estado: estados.pendiente,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            totalReserva: new CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            extras: null
        }
        const totalReserva = new CalculadorPrecioReserva(reservaDTO.habitacion.precio, reservaDTO.extras, 0, reservaDTO.habitacion.oferta).calcular()
        const reserva = new Reserva(
             "1",
            estados.pendiente,
            cliente,
            habitacion,
            new Date(),
            new Date(),
            new CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            null
        )
        // Set fields to match those from crearDesdeDTO
        ;(reserva as any).extras = null;
        (reserva as any).responsable = undefined;

        const reservaDesdeDTO = Reserva.crearDesdeDTO(reservaDTO , totalReserva)
        expect(reservaDesdeDTO).toEqual(reserva)
    })
    it("modificar desde DTO (ESTADO)", () => {
         const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const habitacion = new Habitacion(
            "1",
            "Habitacion Deluxe",
            "Habitacion con vista al mar",
            150,
            10,
            categoriaHabitacion.Suite,
            [Servicios.WIFI, Servicios.BUFFET],
            ["image1.jpg", "image2.jpg"],
            "2",
            "D123"
        )
        const reservaDTO:DTOReserva = {
            id: "1",
            estado: estados.pendiente,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            totalReserva: new CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            extras: null
        }
        const totalReserva = new CalculadorPrecioReserva(reservaDTO.habitacion.precio, reservaDTO.extras, 0, reservaDTO.habitacion.oferta).calcular()
        const reservaDesdeDTO = Reserva.crearDesdeDTO(reservaDTO, totalReserva)
        const nuevoDTO:DTOReserva = {
            id: "1",
            estado: estados.aceptada,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            totalReserva: new CalculadorPrecioReserva(habitacion.precio, null, 0, habitacion.oferta).calcular(),
            extras: null
        }
        reservaDesdeDTO.modificarDesdeDTO(nuevoDTO)
        expect(reservaDesdeDTO.estado).toBe(estados.aceptada)
    })
         
})