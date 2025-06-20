import {faker} from "@faker-js/faker"
import { IReservaAdministrativa } from "../../../contexts/administrativo/infraestructura/interfaces/IReserva"
import { MReservaAdministrativa } from "../../../contexts/administrativo/infraestructura/models/ReservaAdministrativa"

describe("Infraestructura - Test de Integracion Notas Internas", () => {
    it("Debe crear una nota interna y recuperarla", async () => {
        const fakeNotaInterna:IReservaAdministrativa = {
            _id: faker.string.uuid(),
            estado: "aceptada",
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            idEmpleado: faker.string.uuid(),
            tipoReserva: "administracion",
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
            idNotasInternas: [faker.string.uuid()]
        }
        const notaInterna = new MReservaAdministrativa(fakeNotaInterna)
        await notaInterna.save()

        const found = await MReservaAdministrativa.findById(notaInterna._id)
        expect(found).not.toBeNull()
        expect(found?._id).toBe(fakeNotaInterna._id)
    })

    it("Debe actualizar una nota interna", async () => {
        const fakeNotaInterna:IReservaAdministrativa = {
            _id: faker.string.uuid(),
            estado: "aceptada",
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            idEmpleado: faker.string.uuid(),
            tipoReserva: "administracion",
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
            idNotasInternas: [faker.string.uuid()]
        }
        const notaInterna = new MReservaAdministrativa(fakeNotaInterna)
        await notaInterna.save()

        notaInterna.estado = "cancelada"
        await notaInterna.save()

        const found = await MReservaAdministrativa.findById(notaInterna._id)
        expect(found).not.toBeNull()
        expect(found?.estado).toBe("cancelada")
    })

    it("Debe eliminar una nota interna", async () => {
        const fakeNotaInterna:IReservaAdministrativa = {
            _id: faker.string.uuid(),
            estado: "aceptada",
            idCliente: faker.string.uuid(),
            idHabitacion: faker.string.uuid(),
            checkIn: faker.date.recent(),
            checkOut: faker.date.future(),
            idEmpleado: faker.string.uuid(),
            tipoReserva: "administracion",
            totalReserva: faker.number.int({min: 1000, max: 5000}),
            extras: null,
            idNotasInternas: [faker.string.uuid()]
        }
        const notaInterna = new MReservaAdministrativa(fakeNotaInterna)
        await notaInterna.save()

        await MReservaAdministrativa.deleteOne({_id: notaInterna._id})

        const found = await MReservaAdministrativa.findById(notaInterna._id)
        expect(found).toBeNull()
    })
})