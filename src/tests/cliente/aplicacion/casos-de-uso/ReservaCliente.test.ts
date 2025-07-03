import { categoriaHabitacion, Habitacion } from "../../../../contexts/administrativo/dominio/agregados/Habitacion"
import { estados, Reserva } from "../../../../contexts/administrativo/dominio/agregados/Reserva"
import { IReservaRepo } from "../../../../contexts/administrativo/dominio/repositorios/IReservaRepo"
import { Servicios } from "../../../../contexts/administrativo/dominio/value-objects/Servicios"
import { Cliente, metodoPago } from "../../../../contexts/cliente/dominio/agregados/Cliente"

describe("Casos de uso - Reserva Cliente", () => {
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
    
    const reservaCliente = new Reserva(
        "1",
        estados.pendiente,
        cliente,
        habitacion,
        new Date(),
        new Date(),
        120,
        null,
        null,
        null,
        null,
        null
    )

    const reservaClienteRepo:IReservaRepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarPorID: jest.fn().mockResolvedValue(
            Promise.resolve(reservaCliente)
        ),
        buscarPorCliente: jest.fn().mockResolvedValue(
            Promise.resolve([reservaCliente])
        ),
        buscarPorHabitacion: jest.fn(),
        buscarTodasReservas: jest.fn()
    }

    it("crear una reserva", async () => {
        await reservaClienteRepo.guardar(reservaCliente,false)
        expect(reservaClienteRepo.guardar).toHaveBeenCalledWith(reservaCliente, false)
    })

    it("buscar una reserva por ID", async () => {
        const result = await reservaClienteRepo.buscarPorID("1")
        expect(result).not.toBeNull()
        expect(reservaClienteRepo.buscarPorID).toHaveBeenCalledWith("1")
        expect(result?.id).toBe("1")
        expect(result).toBeInstanceOf(Reserva)
    })

    it("buscar reservas por cliente ID", async () => {
        const result = await reservaClienteRepo.buscarPorCliente("1")
        expect(result).not.toBeNull()
        expect(reservaClienteRepo.buscarPorCliente).toHaveBeenCalledWith("1")
        expect(result?.length).toBeGreaterThan(0)
        expect(result?.[0].id).toBe("1")
        expect(result?.[0]).toBeInstanceOf(Reserva)
    })

    it("eliminar una reserva", async () => {
        await reservaClienteRepo.eliminar("1")
        expect(reservaClienteRepo.eliminar).toHaveBeenCalledWith("1")
    })
})