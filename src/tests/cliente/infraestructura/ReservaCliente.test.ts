import {faker} from "@faker-js/faker"
import { IReservaCliente } from "../../../contexts/cliente/infraestructura/interfaces/IReservaCliente"
import { ReservaClienteModelo } from "../../../contexts/cliente/infraestructura/models/ReservaClienteModelo"

describe("Infraestructura - Test de Integracion Reserva Cliente", () => {
    it("Debe crear una reserva y recuperarla", async () => {
        const fakeReserva:IReservaCliente = {
            _id: faker.string.uuid(),
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            tipoReserva: "cliente",
            estadoReserva: "pendiente",
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
        }
        const reserva = new ReservaClienteModelo(fakeReserva)
        await reserva.save()

        const found = await ReservaClienteModelo.findById(reserva._id)
        expect(found).not.toBeNull()
        expect(found?._id).toBe(fakeReserva._id)
    })

    it("Debe actualizar una reserva", async () => {
        const fakeReserva:IReservaCliente = {
            _id: faker.string.uuid(),
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            tipoReserva: "cliente",
            estadoReserva: "pendiente",
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
        }
        const reserva = new ReservaClienteModelo(fakeReserva)
        await reserva.save()

        reserva.estadoReserva = "aceptada"
        await reserva.save()

        const found = await ReservaClienteModelo.findById(reserva._id)
        expect(found).not.toBeNull()
        expect(found?.estadoReserva).toBe("aceptada")
    })

    it("Debe eliminar una reserva", async () => {
        const fakeReserva:IReservaCliente = {
            _id: faker.string.uuid(),
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            tipoReserva: "cliente",
            estadoReserva: "pendiente",
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
        }
        const reserva = new ReservaClienteModelo(fakeReserva)
        await reserva.save()

        await ReservaClienteModelo.deleteOne({_id: reserva._id})

        const found = await ReservaClienteModelo.findById(reserva._id)
        expect(found).toBeNull()
    })
})