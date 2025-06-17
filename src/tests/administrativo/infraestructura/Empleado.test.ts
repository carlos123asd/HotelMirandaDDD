import {faker} from "@faker-js/faker"
import IEmpleado from "../../../contexts/administrativo/infraestructura/interfaces/IEmpleado"
import { MEmpleado } from "../../../contexts/administrativo/infraestructura/models/EmpleadoModelo"

describe("Infraestructura - Test de Integracion Empleado", () => {
    it("Debe crear un empleado y recuperarlo", async () => {
        const fakeEmpleado:IEmpleado = {
            _id: faker.string.uuid(),
            email: faker.internet.email(),
            photo: faker.image.avatar(),
            startDate: faker.date.past(),
            telefono: faker.phone.number(),
            codigo: faker.string.alpha(10),
            nombre: faker.person.fullName(),
            password: faker.internet.password(),
            rol: "admin",
            permisosExtra: [],
            status: "activo"
        }
        const empleado = new MEmpleado(fakeEmpleado)
        await empleado.save()

        const found = await MEmpleado.findById(empleado._id)
        expect(found).not.toBeNull()
        expect(found?.nombre).toBe(fakeEmpleado.nombre)
        expect(found?.email).toBe(fakeEmpleado.email)
    })
    it("Debe actualizar un empleado", async () => {
        const fakeEmpleado:IEmpleado = {
            _id: faker.string.uuid(),
            email: faker.internet.email(),
            photo: faker.image.avatar(),
            startDate: faker.date.past(),
            telefono: faker.phone.number(),
            codigo: faker.string.alpha(10),
            nombre: faker.person.fullName(),
            password: faker.internet.password(),
            rol: "admin",
            permisosExtra: [],
            status: "activo"
        }
        const empleado = new MEmpleado(fakeEmpleado)
        await empleado.save()

        empleado.nombre = "Nombre Actualizado"
        await empleado.save()

        const found = await MEmpleado.findById(empleado._id)
        expect(found).not.toBeNull()
        expect(found?.nombre).toBe("Nombre Actualizado")
    })
    it("Debe eliminar un empleado", async () => {
        const fakeEmpleado:IEmpleado = {
            _id: faker.string.uuid(),
            email: faker.internet.email(),
            photo: faker.image.avatar(),
            startDate: faker.date.past(),
            telefono: faker.phone.number(),
            codigo: faker.string.alpha(10),
            nombre: faker.person.fullName(),
            password: faker.internet.password(),
            rol: "admin",
            permisosExtra: [],
            status: "activo"
        }
        const empleado = new MEmpleado(fakeEmpleado)
        await empleado.save()

        await MEmpleado.deleteOne({_id: empleado._id})

        const found = await MEmpleado.findById(empleado._id)
        expect(found).toBeNull()
    })
})