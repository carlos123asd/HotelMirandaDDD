import {faker} from "@faker-js/faker"
import mongoose from "mongoose"
import { IReserva } from "../../../contexts/administrativo/infraestructura/interfaces/IReserva"
import { MReserva } from "../../../contexts/administrativo/infraestructura/models/Reserva"
import { estados } from "../../../contexts/administrativo/dominio/agregados/Reserva"

describe("Infraestructura - Test de Integracion Reserva Cliente", () => {
    it("Debe crear una reserva", async () => {
        const fakeReserva:IReserva = {
            _id: new mongoose.Types.ObjectId().toString(),
            estado:estados.aceptada,
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            idEmpleado: null,
        }
        const reserva = new MReserva(fakeReserva)
        await reserva.save()

        const found = await MReserva.findById(reserva._id)
        expect(found).not.toBeNull()
        expect(found?._id?.toString()).toBe(fakeReserva._id)
    })

    it("Debe actualizar una reserva", async () => {
        const fakeReserva:IReserva = {
            _id: new mongoose.Types.ObjectId().toString(),
            estado:estados.aceptada,
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            idEmpleado: null,
        }
        const reserva = new MReserva(fakeReserva)
        await reserva.save()

        reserva.estado = "aceptada"
        await reserva.save()

        const found = await MReserva.findById(reserva._id)
        expect(found).not.toBeNull()
        expect(found?.estado).toBe("aceptada")
    })

    it("Debe eliminar una reserva", async () => {
        const fakeReserva:IReserva = {
            _id: new mongoose.Types.ObjectId().toString(),
            estado:estados.aceptada,
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            idEmpleado: null,
        }
        const reserva = new MReserva(fakeReserva)
        await reserva.save()

        await MReserva.deleteOne({_id: reserva._id})

        const found = await MReserva.findById(reserva._id)
        expect(found).toBeNull()
    })
})