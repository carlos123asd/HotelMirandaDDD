import { categoriaHabitacion, Habitacion } from "../../../../contexts/administrativo/dominio/agregados/Habitacion"
import { estados, tipoReserva } from "../../../../contexts/administrativo/dominio/agregados/Reserva"
import { Servicios } from "../../../../contexts/administrativo/dominio/value-objects/Servicios"
import { Cliente, metodoPago } from "../../../../contexts/cliente/dominio/agregados/Cliente"
import { ReservaCliente } from "../../../../contexts/cliente/dominio/agregados/ReservaCliente"
import { IReservaClienteRepo } from "../../../../contexts/cliente/dominio/repositorios/IReservaClienteRepo"

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
    
    const reservaCliente = new ReservaCliente(
        "1",
        cliente,
        habitacion,
        new Date(),
        new Date(),
        tipoReserva.cliente,
        estados.pendiente,
        150,
        null
    )

    const reservaClienteRepo:IReservaClienteRepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarPorId: jest.fn().mockResolvedValue(
            Promise.resolve(reservaCliente)
        ),
        buscarPorCliente: jest.fn().mockResolvedValue(
            Promise.resolve([reservaCliente])
        )
    }

    it("crear una reserva", async () => {
        await reservaClienteRepo.guardar(reservaCliente)
        expect(reservaClienteRepo.guardar).toHaveBeenCalledWith(reservaCliente)
    })

    it("buscar una reserva por ID", async () => {
        const result = await reservaClienteRepo.buscarPorId("1")
        expect(result).not.toBeNull()
        expect(reservaClienteRepo.buscarPorId).toHaveBeenCalledWith("1")
        expect(result?.id).toBe("1")
        expect(result).toBeInstanceOf(ReservaCliente)
    })

    it("buscar reservas por cliente ID", async () => {
        const result = await reservaClienteRepo.buscarPorCliente("1")
        expect(result).not.toBeNull()
        expect(reservaClienteRepo.buscarPorCliente).toHaveBeenCalledWith("1")
        expect(result?.length).toBeGreaterThan(0)
        expect(result?.[0].id).toBe("1")
        expect(result?.[0]).toBeInstanceOf(ReservaCliente)
    })

    it("eliminar una reserva", async () => {
        await reservaClienteRepo.eliminar("1")
        expect(reservaClienteRepo.eliminar).toHaveBeenCalledWith("1")
    })
})