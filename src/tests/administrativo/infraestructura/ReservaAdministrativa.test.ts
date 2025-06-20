import {faker} from "@faker-js/faker"
import { IReserva } from "../../../contexts/administrativo/infraestructura/interfaces/IReserva"
import { MReserva } from "../../../contexts/administrativo/infraestructura/models/Reserva"
import mongoose from "mongoose"

describe("Infraestructura - Test de Integracion Notas Internas", () => {
    it("Debe crear una nota interna y recuperarla", async () => {
        const fakeNotaInterna:IReserva = {
            _id: new mongoose.Types.ObjectId().toString(),
            estado: "aceptada",
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            idEmpleado: faker.string.uuid(),
            extras: null,
            idNotasInternas: [faker.string.uuid()]
        }
        const notaInterna = new MReserva(fakeNotaInterna)
        await notaInterna.save()

        const found = await MReserva.findById(notaInterna._id)
        expect(found).not.toBeNull()
        expect(found?._id.toString()).toBe(fakeNotaInterna._id)
    })

    it("Debe actualizar una nota interna", async () => {
        const fakeNotaInterna:IReserva = {
            _id: new mongoose.Types.ObjectId().toString(),
            estado: "aceptada",
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            idEmpleado: faker.string.uuid(),
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
            idNotasInternas: [faker.string.uuid()]
        }
        const notaInterna = new MReserva(fakeNotaInterna)
        await notaInterna.save()

        notaInterna.estado = "cancelada"
        await notaInterna.save()

        const found = await MReserva.findById(notaInterna._id)
        expect(found).not.toBeNull()
        expect(found?.estado).toBe("cancelada")
    })

    it("Debe eliminar una nota interna", async () => {
        const fakeNotaInterna:IReserva = {
            _id: new mongoose.Types.ObjectId().toString(),
            estado: "aceptada",
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            idEmpleado: faker.string.uuid(),
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
            idNotasInternas: [faker.string.uuid()]
        }
        const notaInterna = new MReserva(fakeNotaInterna)
        await notaInterna.save()

        await MReserva.deleteOne({_id: notaInterna._id})

        const found = await MReserva.findById(notaInterna._id)
        expect(found).toBeNull()
    })
})