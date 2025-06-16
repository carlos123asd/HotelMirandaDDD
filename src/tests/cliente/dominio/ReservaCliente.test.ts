import { categoriaHabitacion, Habitacion } from "../../../contexts/administrativo/dominio/agregados/Habitacion"
import { estados, tipoReserva } from "../../../contexts/administrativo/dominio/agregados/ReservaAdministrativa"
import { Servicios } from "../../../contexts/administrativo/dominio/value-objects/Servicios"
import { DTOReservaCliente } from "../../../contexts/cliente/aplicacion/dtos/DTOReservaCliente"
import { Cliente, metodoPago } from "../../../contexts/cliente/dominio/agregados/Cliente"
import { ReservaCliente } from "../../../contexts/cliente/dominio/agregados/ReservaCliente"

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
        const reserva = new ReservaCliente(
            "1",
            cliente,
            habitacion,
            new Date(),
            new Date(),
            tipoReserva.cliente,
            estados.pendiente,
            null
        )
        const reservaDesdePersistencia = ReservaCliente.crearDesdePersistencia({
            id: reserva.id,
            asignacion: reserva.asignacion,
            habitacion: reserva.habitacion,
            checkIn: reserva.checkIn,
            checkOut: reserva.checkOut,
            tipoReserva: reserva.tipoReserva,
            estadoReserva: reserva.estadoReserva,
            extras: reserva.extras
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
        const reservaDTO:DTOReservaCliente = {
            id: "1",
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            tipoReserva: tipoReserva.cliente,
            estadoReserva: estados.pendiente,
            extras: null
        }
        const reserva = new ReservaCliente(
            "1",
            cliente,
            habitacion,
            new Date(),
            new Date(),
            tipoReserva.cliente,
            estados.pendiente,
            null
        )
        const reservaDesdeDTO = ReservaCliente.crearDesdeDTO(reservaDTO)
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
        const reservaDTO:DTOReservaCliente = {
            id: "1",
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            tipoReserva: tipoReserva.cliente,
            estadoReserva: estados.pendiente,
            extras: null
        }
        const reservaDesdeDTO = ReservaCliente.crearDesdeDTO(reservaDTO)
        const nuevoDTO:DTOReservaCliente = {
            id: "1",
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            tipoReserva: tipoReserva.cliente,
            estadoReserva: estados.aceptada,
            extras: null
        }
        reservaDesdeDTO.modificarDesdeDTO(nuevoDTO)
        expect(reservaDesdeDTO.estadoReserva).toBe(estados.aceptada)
    })
         
})