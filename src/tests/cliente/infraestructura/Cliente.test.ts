import {faker} from "@faker-js/faker"
import { ICliente } from "../../../contexts/cliente/infraestructura/interfaces/ICliente"
import { ClienteModelo } from "../../../contexts/cliente/infraestructura/models/ClienteModelo"

describe("Infraestructura - Test de Integracion Cliente", () => {
    it("Debe crear un cliente y recuperarlo", async () => {
        const fakeCliente:ICliente = {
            _id: faker.string.uuid(),
            nombre: faker.person.fullName(),
            email: faker.internet.email(),
            direccion: faker.location.streetAddress(),
            password: faker.internet.password(),
            metodoPago: "Tarjeta"
        }
        const cliente = new ClienteModelo(fakeCliente)
        await cliente.save()

        const found = await ClienteModelo.findById(cliente._id)
        expect(found).not.toBeNull()
        expect(found?._id).toBe(fakeCliente._id)
    })

    it("Debe actualizar un cliente", async () => {
        const fakeCliente:ICliente = {
            _id: faker.string.uuid(),
            nombre: faker.person.fullName(),
            email: faker.internet.email(),
            direccion: faker.location.streetAddress(),
            password: faker.internet.password(),
            metodoPago: "Tarjeta"
        }
        const cliente = new ClienteModelo(fakeCliente)
        await cliente.save()

        cliente.nombre = "Nombre Actualizado"
        await cliente.save()

        const found = await ClienteModelo.findById(cliente._id)
        expect(found).not.toBeNull()
        expect(found?.nombre).toBe("Nombre Actualizado")
    })

    it("Debe eliminar un cliente", async () => {
        const fakeCliente:ICliente = {
            _id: faker.string.uuid(),
            nombre: faker.person.fullName(),
            email: faker.internet.email(),
            direccion: faker.location.streetAddress(),
            password: faker.internet.password(),
            metodoPago: "Tarjeta"
        }
        const cliente = new ClienteModelo(fakeCliente)
        await cliente.save()

        await ClienteModelo.deleteOne({_id: cliente._id})

        const found = await ClienteModelo.findById(cliente._id)
        expect(found).toBeNull()
    })
})