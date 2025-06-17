import {faker} from "@faker-js/faker"
import IHabitacion from "../../../contexts/administrativo/infraestructura/interfaces/IHabitacion"
import { MHabitacion } from "../../../contexts/administrativo/infraestructura/models/HabitacionModelo"

describe("Infraestructura - Test de Integracion Habitacion", () => {
    it("Debe crear una habitacion y recuperarla", async () => {
        const fakeHabitacion:IHabitacion = {
            _id: faker.string.uuid(),
            nombre: faker.person.fullName(),
            descripcion: faker.lorem.paragraph(),
            precio: faker.number.float({ min: 50, max: 500 }),
            oferta: faker.number.float({ min: 0, max: 100 }),
            categoria: faker.commerce.department(),
            servicios: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
            imagenes: [faker.image.url(), faker.image.url()],
            piso: faker.string.alpha(1),
            codigo: faker.string.alpha(10)
        }
        const habitacion = new MHabitacion(fakeHabitacion)
        await habitacion.save()

        const found = await MHabitacion.findById(habitacion._id)
        expect(found).not.toBeNull()
        expect(found?.codigo).toBe(fakeHabitacion.codigo)
    })

    it("Debe actualizar una habitacion", async () => {
        const fakeHabitacion:IHabitacion = {
            _id: faker.string.uuid(),
            nombre: faker.person.fullName(),
            descripcion: faker.lorem.paragraph(),
            precio: faker.number.float({ min: 50, max: 500 }),
            oferta: faker.number.float({ min: 0, max: 100 }),
            categoria: faker.commerce.department(),
            servicios: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
            imagenes: [faker.image.url(), faker.image.url()],
            piso: faker.string.alpha(1),
            codigo: faker.string.alpha(10)
        }
        const habitacion = new MHabitacion(fakeHabitacion)
        await habitacion.save()

        habitacion.nombre = "Nombre Actualizado"
        await habitacion.save()

        const found = await MHabitacion.findById(habitacion._id)
        expect(found).not.toBeNull()
        expect(found?.nombre).toBe("Nombre Actualizado")
    })

    it("Debe eliminar una habitacion", async () => {
        const fakeHabitacion:IHabitacion = {
            _id: faker.string.uuid(),
            nombre: faker.person.fullName(),
            descripcion: faker.lorem.paragraph(),
            precio: faker.number.float({ min: 50, max: 500 }),
            oferta: faker.number.float({ min: 0, max: 100 }),
            categoria: faker.commerce.department(),
            servicios: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
            imagenes: [faker.image.url(), faker.image.url()],
            piso: faker.string.alpha(1),
            codigo: faker.string.alpha(10)
        }
        const habitacion = new MHabitacion(fakeHabitacion)
        await habitacion.save()

        await MHabitacion.deleteOne({_id: habitacion._id})

        const found = await MHabitacion.findById(habitacion._id)
        expect(found).toBeNull()
    })
})