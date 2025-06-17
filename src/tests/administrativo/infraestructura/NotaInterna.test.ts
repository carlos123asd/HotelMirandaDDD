import {faker} from "@faker-js/faker"
import { INotasInternas } from "../../../contexts/administrativo/infraestructura/interfaces/INotasInternas"
import { MNotasInternas } from "../../../contexts/administrativo/infraestructura/models/NotasInternas"

describe("Infraestructura - Test de Integracion Notas Internas", () => {
    it("Debe crear una nota interna y recuperarla", async () => {
        const fakeNotaInterna:INotasInternas = {
            _id: faker.string.uuid(),
            idResponsable: faker.string.uuid(),
            tipo: "Habitacion",
            fecha: faker.date.recent(),
            titulo: faker.lorem.sentence(),
            descripcion: faker.lorem.paragraph(),
            tipoReserva: null,
            datosAgregados: null,
            idCliente: null,
            idReserva: null,
            idHabitacion: null
        }
        const notaInterna = new MNotasInternas(fakeNotaInterna)
        await notaInterna.save()

        const found = await MNotasInternas.findById(notaInterna._id)
        expect(found).not.toBeNull()
        expect(found?.titulo).toBe(fakeNotaInterna.titulo)
    })

    it("Debe actualizar una nota interna", async () => {
        const fakeNotaInterna:INotasInternas = {
            _id: faker.string.uuid(),
            idResponsable: faker.string.uuid(),
            tipo: "Habitacion",
            fecha: faker.date.recent(),
            titulo: faker.lorem.sentence(),
            descripcion: faker.lorem.paragraph(),
            tipoReserva: null,
            datosAgregados: null,
            idCliente: null,
            idReserva: null,
            idHabitacion: null
        }
        const notaInterna = new MNotasInternas(fakeNotaInterna)
        await notaInterna.save()

        notaInterna.titulo = "Titulo Actualizado"
        await notaInterna.save()

        const found = await MNotasInternas.findById(notaInterna._id)
        expect(found).not.toBeNull()
        expect(found?.titulo).toBe("Titulo Actualizado")
    })

    it("Debe eliminar una nota interna", async () => {
        const fakeNotaInterna:INotasInternas = {
            _id: faker.string.uuid(),
            idResponsable: faker.string.uuid(),
            tipo: "Habitacion",
            fecha: faker.date.recent(),
            titulo: faker.lorem.sentence(),
            descripcion: faker.lorem.paragraph(),
            tipoReserva: null,
            datosAgregados: null,
            idCliente: null,
            idReserva: null,
            idHabitacion: null
        }
        const notaInterna = new MNotasInternas(fakeNotaInterna)
        await notaInterna.save()

        await MNotasInternas.deleteOne({_id: notaInterna._id})

        const found = await MNotasInternas.findById(notaInterna._id)
        expect(found).toBeNull()
    })
})