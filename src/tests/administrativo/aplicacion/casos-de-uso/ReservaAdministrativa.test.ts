import { Empleado, StatusType } from "../../../../contexts/administrativo/dominio/agregados/Empleado"
import { categoriaHabitacion, Habitacion } from "../../../../contexts/administrativo/dominio/agregados/Habitacion"
import { estados, ReservaAdministrativa, tipoReserva } from "../../../../contexts/administrativo/dominio/agregados/ReservaAdministrativa"
import { IReservaRepo } from "../../../../contexts/administrativo/dominio/repositorios/IReservaRepo"
import { Permiso } from "../../../../contexts/administrativo/dominio/value-objects/Permiso"
import { Rol } from "../../../../contexts/administrativo/dominio/value-objects/Rol"
import { Servicios } from "../../../../contexts/administrativo/dominio/value-objects/Servicios"
import { Cliente, metodoPago } from "../../../../contexts/cliente/dominio/agregados/Cliente"

describe("Casos de uso - Reserva Administrativa", () => {
    const admin = new Empleado(
        "1",
        "carlos-medin@hotmail.com",
        "photo.com",
        new Date(),
        "12345",
        "1998CM",
        "Carlos Medina",
        "@123",
        Rol.ADMIN,
        StatusType.ACTIVO,
        [new Permiso('ADM',3,"admin")]
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
    const cliente = new Cliente(
        "1",
        "Juan Perez",
        "juan.perez@example.com",
        "Calle Falsa 123",
        "password123",
        metodoPago.Tarjeta
    )
    const reserva = new ReservaAdministrativa(
        "1",
        estados.aceptada,
        cliente,
        habitacion,
        new Date(),
        new Date(),
        admin,
        tipoReserva.administracion,
        150,
        null
    )
    const reservaRrepo:IReservaRepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarPorID: jest.fn().mockReturnValue(
            reserva
        ),
        buscarPorCliente: jest.fn().mockReturnValue(
            [reserva]
        ),
        buscarPorHabitacion: jest.fn().mockReturnValue(
            [reserva]
        )
    }

    it("crear reserva", async () => {
        await reservaRrepo.guardar(reserva)
        expect(reservaRrepo.guardar).toHaveBeenCalledWith(reserva)
    })

    it("eliminar reserva", async () => {
        const id = "1"
        await reservaRrepo.eliminar(id)

        expect(reservaRrepo.eliminar).toHaveBeenCalledWith(id)
    })

    it("buscar reserva por id", async () => {
        const habitacion = await reservaRrepo.buscarPorID("1")
        expect(habitacion).not.toBeNull()
        expect(habitacion).toBeInstanceOf(ReservaAdministrativa)
        expect(habitacion?.id).toBe("1")
    })

    it("buscar reserva por habitacion", async () => {
        const notas = await reservaRrepo.buscarPorHabitacion("1")
        expect(notas).not.toBeNull()
        expect(notas).toBeInstanceOf(Array)
        expect(notas?.length).toBeGreaterThan(0)
        expect(notas?.[0]).toBeInstanceOf(ReservaAdministrativa)
        expect(notas?.[0].habitacion?.id).toBe("1")
    })
})